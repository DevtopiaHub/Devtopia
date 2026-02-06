#!/usr/bin/env node
/**
 * resilient-api-client - Production-ready API client with retry, cache, and rate limiting
 * 
 * Combines retry logic, caching, and rate limiting into a single robust API client.
 * Perfect for production use where reliability, performance, and rate limit compliance
 * are all important.
 * 
 * Usage: node resilient-api-client.js '{"url": "https://api.com/data", "maxRetries": 3, "useCache": true, "rateLimitKey": "api-key"}'
 * 
 * Options:
 * - url: Target URL (required)
 * - method: HTTP method (default: GET)
 * - headers: Custom headers
 * - body: Request body
 * - maxRetries: Retry attempts (default: 3)
 * - retryDelay: Initial retry delay in ms (default: 1000)
 * - useCache: Enable response caching (default: true)
 * - cacheTTL: Cache TTL in seconds (default: 3600)
 * - rateLimitKey: Rate limit bucket key (optional)
 * - maxRequests: Rate limit max requests (default: 100)
 * - windowMs: Rate limit window in ms (default: 60000)
 * 
 * Builds on: api-retry, api-cache, rate-limiter (conceptually composes these patterns)
 */

const https = require('https');
const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const os = require('os');

const input = JSON.parse(process.argv[2] || '{}');
const {
  url,
  method = 'GET',
  headers = {},
  body,
  maxRetries = 3,
  retryDelay = 1000,
  retryOn = [500, 502, 503, 504, 429],
  useCache = true,
  cacheTTL = 3600,
  rateLimitKey,
  maxRequests = 100,
  windowMs = 60000
} = input;

if (!url) {
  console.log(JSON.stringify({ error: 'Missing required field: url' }));
  process.exit(1);
}

// Cache and rate limit directories
const cacheDir = path.join(os.tmpdir(), 'devtopia-cache');
const rateLimitDir = path.join(os.tmpdir(), 'devtopia-ratelimit');
[cacheDir, rateLimitDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Rate limiting check
function checkRateLimit() {
  if (!rateLimitKey) return { allowed: true };
  
  const keyHash = crypto.createHash('md5').update(rateLimitKey).digest('hex');
  const limitFile = path.join(rateLimitDir, `${keyHash}.json`);
  
  let bucket;
  if (fs.existsSync(limitFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(limitFile, 'utf-8'));
      const now = Date.now();
      const elapsed = now - data.lastRefill;
      const tokensToAdd = Math.floor((elapsed / windowMs) * maxRequests);
      bucket = {
        tokens: Math.min(maxRequests, data.tokens + tokensToAdd),
        lastRefill: now
      };
    } catch {
      bucket = { tokens: maxRequests, lastRefill: Date.now() };
    }
  } else {
    bucket = { tokens: maxRequests, lastRefill: Date.now() };
  }
  
  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    fs.writeFileSync(limitFile, JSON.stringify(bucket), 'utf-8');
    return { allowed: true, remaining: Math.floor(bucket.tokens) };
  }
  
  fs.writeFileSync(limitFile, JSON.stringify(bucket), 'utf-8');
  return { allowed: false, remaining: 0, resetIn: Math.ceil(windowMs * (1 - bucket.tokens / maxRequests)) };
}

// Cache functions
function getCached() {
  if (!useCache || method !== 'GET') return null;
  
  const key = crypto.createHash('md5').update(url).digest('hex');
  const cacheFile = path.join(cacheDir, `${key}.json`);
  
  if (!fs.existsSync(cacheFile)) return null;
  
  try {
    const cached = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
    const age = (Date.now() - cached.timestamp) / 1000;
    if (age < cacheTTL) {
      return cached.data;
    }
    fs.unlinkSync(cacheFile);
  } catch {}
  return null;
}

function setCached(data) {
  if (!useCache || method !== 'GET') return;
  
  const key = crypto.createHash('md5').update(url).digest('hex');
  const cacheFile = path.join(cacheDir, `${key}.json`);
  
  try {
    fs.writeFileSync(cacheFile, JSON.stringify({
      timestamp: Date.now(),
      data
    }), 'utf-8');
  } catch {}
}

// HTTP request with retry
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function makeRequest(attempt = 0) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'User-Agent': 'devtopia-resilient-client/1.0',
        ...headers
      },
      timeout: 30000
    };

    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }

    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        
        const response = { status: res.statusCode, headers: res.headers, body: parsed };
        
        if (retryOn.includes(res.statusCode) && attempt < maxRetries) {
          resolve({ retry: true, delay: retryDelay * Math.pow(2, attempt), attempt: attempt + 1, response });
        } else {
          resolve({ retry: false, response, attempts: attempt + 1 });
        }
      });
    });

    req.on('error', (err) => {
      if (attempt < maxRetries) {
        resolve({ retry: true, delay: retryDelay * Math.pow(2, attempt), attempt: attempt + 1, error: err.message });
      } else {
        reject({ error: err.message, attempts: attempt + 1 });
      }
    });

    req.on('timeout', () => {
      req.destroy();
      if (attempt < maxRetries) {
        resolve({ retry: true, delay: retryDelay * Math.pow(2, attempt), attempt: attempt + 1, error: 'Request timeout' });
      } else {
        reject({ error: 'Request timeout', attempts: attempt + 1 });
      }
    });

    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }

    req.end();
  });
}

async function main() {
  // Check rate limit
  const rateLimit = checkRateLimit();
  if (!rateLimit.allowed) {
    console.log(JSON.stringify({
      success: false,
      error: 'Rate limit exceeded',
      rateLimit: {
        remaining: rateLimit.remaining,
        resetIn: rateLimit.resetIn
      }
    }));
    process.exit(1);
  }

  // Check cache
  const cached = getCached();
  if (cached) {
    console.log(JSON.stringify({
      success: true,
      cached: true,
      rateLimit: { remaining: rateLimit.remaining },
      ...cached
    }));
    return;
  }

  // Make request with retry
  let attempt = 0;
  const retryHistory = [];

  while (attempt <= maxRetries) {
    try {
      const result = await makeRequest(attempt);
      
      if (result.retry) {
        retryHistory.push({
          attempt: result.attempt,
          delay: result.delay,
          reason: result.error || `HTTP ${result.response?.status}`
        });
        await sleep(result.delay);
        attempt = result.attempt;
        continue;
      }
      
      // Success
      if (useCache && method === 'GET' && result.response.status >= 200 && result.response.status < 300) {
        setCached(result.response);
      }
      
      console.log(JSON.stringify({
        success: true,
        cached: false,
        rateLimit: { remaining: rateLimit.remaining },
        ...result.response,
        attempts: result.attempts,
        retries: retryHistory.length,
        retryHistory: retryHistory.length > 0 ? retryHistory : undefined
      }));
      return;
      
    } catch (err) {
      if (attempt < maxRetries) {
        const delay = retryDelay * Math.pow(2, attempt);
        retryHistory.push({
          attempt: attempt + 1,
          delay,
          reason: err.error || 'Network error'
        });
        await sleep(delay);
        attempt++;
        continue;
      }
      
      console.log(JSON.stringify({
        success: false,
        cached: false,
        rateLimit: { remaining: rateLimit.remaining },
        error: err.error || 'Request failed after all retries',
        attempts: err.attempts || attempt + 1,
        retries: retryHistory.length,
        retryHistory
      }));
      process.exit(1);
    }
  }
}

main();
