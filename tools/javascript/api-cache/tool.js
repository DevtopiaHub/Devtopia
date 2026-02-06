#!/usr/bin/env node
/**
 * api-cache - HTTP client with response caching
 * 
 * Makes HTTP requests with intelligent caching to reduce API calls.
 * Caches responses based on URL and optional cache key. Perfect for
 * reducing redundant API calls and improving performance.
 * 
 * Usage: node api-cache.js '{"url": "https://api.com/data", "cacheKey": "optional-key", "ttl": 3600}'
 * 
 * Options:
 * - url: Target URL (required)
 * - method: HTTP method (default: GET)
 * - headers: Custom headers object
 * - body: Request body (for POST/PUT/PATCH)
 * - cacheKey: Optional custom cache key (default: URL)
 * - ttl: Time to live in seconds (default: 3600)
 * - forceRefresh: Bypass cache and fetch fresh (default: false)
 * 
 * Builds on: api-request (conceptually extends with caching)
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
  cacheKey,
  ttl = 3600,
  forceRefresh = false
} = input;

if (!url) {
  console.log(JSON.stringify({ error: 'Missing required field: url' }));
  process.exit(1);
}

// Cache directory
const cacheDir = path.join(os.tmpdir(), 'devtopia-cache');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

// Generate cache key
const key = cacheKey || crypto.createHash('md5').update(url + (body ? JSON.stringify(body) : '')).digest('hex');
const cacheFile = path.join(cacheDir, `${key}.json`);

// Check cache
function getCached() {
  if (forceRefresh || !fs.existsSync(cacheFile)) {
    return null;
  }
  
  try {
    const cached = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
    const age = (Date.now() - cached.timestamp) / 1000;
    
    if (age < ttl) {
      return cached.data;
    }
    
    // Expired, delete cache file
    fs.unlinkSync(cacheFile);
    return null;
  } catch {
    return null;
  }
}

// Save to cache
function setCached(data) {
  try {
    fs.writeFileSync(cacheFile, JSON.stringify({
      timestamp: Date.now(),
      data
    }), 'utf-8');
  } catch (err) {
    // Cache write failed, but don't fail the request
  }
}

// Make HTTP request (similar to api-request)
function makeRequest() {
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
        'User-Agent': 'devtopia-api-cache/1.0',
        ...headers
      },
      timeout: 30000
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }

    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        let parsed;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        
        const response = {
          status: res.statusCode,
          headers: res.headers,
          body: parsed
        };
        
        // Only cache successful GET requests
        if (method === 'GET' && res.statusCode >= 200 && res.statusCode < 300) {
          setCached(response);
        }
        
        resolve(response);
      });
    });

    req.on('error', (err) => {
      reject({ error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({ error: 'Request timeout' });
    });

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      req.write(bodyStr);
    }

    req.end();
  });
}

async function main() {
  // Check cache first
  const cached = getCached();
  if (cached) {
    console.log(JSON.stringify({
      success: true,
      cached: true,
      ...cached
    }));
    return;
  }

  // Fetch fresh
  try {
    const response = await makeRequest();
    console.log(JSON.stringify({
      success: true,
      cached: false,
      ...response
    }));
  } catch (err) {
    console.log(JSON.stringify({
      success: false,
      cached: false,
      error: err.error || 'Request failed'
    }));
    process.exit(1);
  }
}

main();
