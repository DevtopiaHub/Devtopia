#!/usr/bin/env node
/**
 * batch-api-client - Batch API requests with parallel execution
 * 
 * Execute multiple API requests in parallel with error handling and
 * result aggregation. Perfect for bulk operations and data fetching.
 * 
 * Usage: node batch-api-client.js '{"requests": [{"url": "https://api.com/1"}, {"url": "https://api.com/2"}]}'
 * 
 * Options:
 * - requests: Array of request objects (required)
 * - maxConcurrent: Maximum parallel requests (default: 5)
 * - stopOnError: Stop on first error (default: false)
 * 
 * Builds on: api-request
 */

const input = JSON.parse(process.argv[2] || '{}');

async function makeRequest(request) {
  try {
    const method = (request.method || 'GET').toUpperCase();
    const headers = {
      'Content-Type': 'application/json',
      ...(request.headers || {})
    };
    
    const fetchOptions = {
      method,
      headers
    };
    
    if (['POST', 'PUT', 'PATCH'].includes(method) && request.body) {
      fetchOptions.body = typeof request.body === 'string' 
        ? request.body 
        : JSON.stringify(request.body);
    }
    
    const response = await fetch(request.url, fetchOptions);
    const text = await response.text();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    
    return {
      success: response.ok,
      url: request.url,
      status: response.status,
      data,
      error: null
    };
  } catch (err) {
    return {
      success: false,
      url: request.url,
      status: null,
      data: null,
      error: err.message
    };
  }
}

async function processBatch(requests, maxConcurrent = 5, stopOnError = false) {
  const results = [];
  const errors = [];
  
  for (let i = 0; i < requests.length; i += maxConcurrent) {
    const batch = requests.slice(i, i + maxConcurrent);
    const batchPromises = batch.map(req => makeRequest(req));
    
    const batchResults = await Promise.all(batchPromises);
    
    for (const result of batchResults) {
      if (result.success) {
        results.push(result);
      } else {
        errors.push(result);
        if (stopOnError) {
          return { results, errors, stopped: true };
        }
      }
    }
  }
  
  return { results, errors, stopped: false };
}

async function main() {
  if (!input.requests || !Array.isArray(input.requests)) {
    console.log(JSON.stringify({ error: 'Missing or invalid "requests" array' }));
    process.exit(1);
  }
  
  if (input.requests.length === 0) {
    console.log(JSON.stringify({ error: 'Requests array is empty' }));
    process.exit(1);
  }
  
  const maxConcurrent = input.maxConcurrent || 5;
  const stopOnError = input.stopOnError || false;
  
  const { results, errors, stopped } = await processBatch(
    input.requests,
    maxConcurrent,
    stopOnError
  );
  
  console.log(JSON.stringify({
    success: errors.length === 0,
    total: input.requests.length,
    succeeded: results.length,
    failed: errors.length,
    results,
    errors: errors.length > 0 ? errors : undefined,
    stopped
  }));
  
  if (errors.length > 0) {
    process.exit(1);
  }
}

main();
