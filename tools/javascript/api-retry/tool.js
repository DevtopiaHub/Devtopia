#!/usr/bin/env node
/**
 * api-retry - HTTP client with retry logic and exponential backoff
 * 
 * Makes HTTP requests with automatic retry on failure. Handles transient
 * network errors, 5xx server errors, and rate limiting. Uses exponential
 * backoff to avoid overwhelming servers.
 * 
 * Usage: node api-retry.js '{"url": "https://api.com/data", "maxRetries": 3}'
 * 
 * Options:
 * - url: Target URL (required)
 * - method: HTTP method (default: GET)
 * - headers: Custom headers object
 * - body: Request body (for POST/PUT/PATCH)
 * - maxRetries: Maximum retry attempts (default: 3)
 * - retryDelay: Initial delay in ms (default: 1000)
 * - retryOn: Array of status codes to retry on (default: [500, 502, 503, 504, 429])
 * - retryOnNetworkError: Retry on network errors (default: true)
 * 
 * Builds on: api-request (conceptually, implements similar HTTP logic with retry)
 */

const https = require('https');
const http = require('http');

const input = JSON.parse(process.argv[2] || '{}');
const {
  url,
  method = 'GET',
  headers = {},
  body,
  maxRetries = 3,
  retryDelay = 1000,
  retryOn = [500, 502, 503, 504, 429],
  retryOnNetworkError = true
} = input;

if (!url) {
  console.log(JSON.stringify({ error: 'Missing required field: url' }));
  process.exit(1);
}

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
        'User-Agent': 'devtopia-api-retry/1.0',
        ...headers
      },
      timeout: 30000 // 30 second timeout
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

        // Check if we should retry
        if (retryOn.includes(res.statusCode) && attempt < maxRetries) {
          const delay = retryDelay * Math.pow(2, attempt);
          resolve({ retry: true, delay, attempt: attempt + 1, response });
        } else {
          resolve({ retry: false, response, attempts: attempt + 1 });
        }
      });
    });

    req.on('error', (err) => {
      if (retryOnNetworkError && attempt < maxRetries) {
        const delay = retryDelay * Math.pow(2, attempt);
        resolve({ retry: true, delay, attempt: attempt + 1, error: err.message });
      } else {
        reject({ error: err.message, attempts: attempt + 1 });
      }
    });

    req.on('timeout', () => {
      req.destroy();
      if (retryOnNetworkError && attempt < maxRetries) {
        const delay = retryDelay * Math.pow(2, attempt);
        resolve({ retry: true, delay, attempt: attempt + 1, error: 'Request timeout' });
      } else {
        reject({ error: 'Request timeout', attempts: attempt + 1 });
      }
    });

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      req.write(bodyStr);
    }

    req.end();
  });
}

async function executeWithRetry() {
  let attempt = 0;
  const retryHistory = [];

  while (attempt <= maxRetries) {
    try {
      const result = await makeRequest(attempt);
      
      if (result.retry) {
        retryHistory.push({
          attempt: result.attempt,
          delay: result.delay,
          reason: result.error || `HTTP ${result.response?.status}`,
          timestamp: new Date().toISOString()
        });
        
        await sleep(result.delay);
        attempt = result.attempt;
        continue;
      }
      
      // Success
      console.log(JSON.stringify({
        success: true,
        status: result.response.status,
        headers: result.response.headers,
        body: result.response.body,
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
          reason: err.error || 'Network error',
          timestamp: new Date().toISOString()
        });
        
        await sleep(delay);
        attempt++;
        continue;
      }
      
      // Final failure
      console.log(JSON.stringify({
        success: false,
        error: err.error || 'Request failed after all retries',
        attempts: err.attempts || attempt + 1,
        retries: retryHistory.length,
        retryHistory
      }));
      process.exit(1);
    }
  }
}

executeWithRetry();
