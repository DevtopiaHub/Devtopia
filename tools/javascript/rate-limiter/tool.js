#!/usr/bin/env node
/**
 * rate-limiter - Rate limiting utility for API calls
 * 
 * Implements token bucket algorithm for rate limiting. Tracks requests
 * per time window and enforces limits. Perfect for respecting API
 * rate limits and preventing request flooding.
 * 
 * Usage: node rate-limiter.js '{"key": "api-key", "maxRequests": 100, "windowMs": 60000}'
 * 
 * Options:
 * - key: Unique identifier for the rate limit bucket (required)
 * - maxRequests: Maximum requests allowed in window (default: 100)
 * - windowMs: Time window in milliseconds (default: 60000 = 1 minute)
 * - checkOnly: Only check limit without consuming token (default: false)
 * 
 * Builds on: (standalone utility, can be composed with api-request, api-retry)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const input = JSON.parse(process.argv[2] || '{}');
const {
  key,
  maxRequests = 100,
  windowMs = 60000,
  checkOnly = false
} = input;

if (!key) {
  console.log(JSON.stringify({ error: 'Missing required field: key' }));
  process.exit(1);
}

// Rate limit storage directory
const rateLimitDir = path.join(os.tmpdir(), 'devtopia-ratelimit');
if (!fs.existsSync(rateLimitDir)) {
  fs.mkdirSync(rateLimitDir, { recursive: true });
}

// Generate file path for this key
const keyHash = crypto.createHash('md5').update(key).digest('hex');
const limitFile = path.join(rateLimitDir, `${keyHash}.json`);

// Token bucket implementation
class TokenBucket {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.tokens = maxRequests;
    this.lastRefill = Date.now();
  }

  refill() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    const tokensToAdd = Math.floor((elapsed / this.windowMs) * this.maxRequests);
    
    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.maxRequests, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  }

  consume() {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }

  check() {
    this.refill();
    return {
      allowed: this.tokens >= 1,
      remaining: Math.floor(this.tokens),
      resetIn: this.tokens < this.maxRequests 
        ? Math.ceil((this.windowMs * (1 - this.tokens / this.maxRequests)))
        : 0
    };
  }

  toJSON() {
    return {
      tokens: this.tokens,
      lastRefill: this.lastRefill,
      maxRequests: this.maxRequests,
      windowMs: this.windowMs
    };
  }

  static fromJSON(data) {
    const bucket = new TokenBucket(data.maxRequests, data.windowMs);
    bucket.tokens = data.tokens;
    bucket.lastRefill = data.lastRefill;
    return bucket;
  }
}

// Load bucket from file
function loadBucket() {
  if (!fs.existsSync(limitFile)) {
    return new TokenBucket(maxRequests, windowMs);
  }

  try {
    const data = JSON.parse(fs.readFileSync(limitFile, 'utf-8'));
    const bucket = TokenBucket.fromJSON(data);
    // Update maxRequests/windowMs if changed
    if (bucket.maxRequests !== maxRequests || bucket.windowMs !== windowMs) {
      bucket.maxRequests = maxRequests;
      bucket.windowMs = windowMs;
    }
    return bucket;
  } catch {
    return new TokenBucket(maxRequests, windowMs);
  }
}

// Save bucket to file
function saveBucket(bucket) {
  try {
    fs.writeFileSync(limitFile, JSON.stringify(bucket.toJSON()), 'utf-8');
  } catch (err) {
    // Save failed, but continue
  }
}

function main() {
  const bucket = loadBucket();

  if (checkOnly) {
    const status = bucket.check();
    saveBucket(bucket);
    
    console.log(JSON.stringify({
      allowed: status.allowed,
      remaining: status.remaining,
      limit: maxRequests,
      resetIn: status.resetIn,
      windowMs
    }));
  } else {
    const allowed = bucket.consume();
    saveBucket(bucket);
    
    if (allowed) {
      const status = bucket.check();
      console.log(JSON.stringify({
        allowed: true,
        remaining: status.remaining,
        limit: maxRequests,
        resetIn: status.resetIn,
        windowMs
      }));
    } else {
      const status = bucket.check();
      console.log(JSON.stringify({
        allowed: false,
        remaining: 0,
        limit: maxRequests,
        resetIn: status.resetIn,
        windowMs,
        error: 'Rate limit exceeded'
      }));
      process.exit(1);
    }
  }
}

main();
