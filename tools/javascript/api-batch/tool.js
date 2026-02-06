#!/usr/bin/env node
/**
 * api-batch - Batch API requests with retry logic and parallel execution
 */
const input = JSON.parse(process.argv[2] || '{}');
const { urls = [], method = 'GET', headers = {}, maxConcurrent = 5, retries = 3 } = input;

if (!Array.isArray(urls) || urls.length === 0) {
  console.log(JSON.stringify({ error: 'Missing required parameter: urls (array)' }));
  process.exit(1);
}

async function fetchWithRetry(url, method, headers, maxRetries) {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const fetch = globalThis.fetch || (await import('node-fetch')).default;
      const response = await fetch(url, { method, headers });
      
      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        return { success: true, url, status: response.status, data };
      }
      
      // Retry on 5xx or 429
      if (response.status >= 500 || response.status === 429) {
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
          continue;
        }
      }
      
      return { success: false, url, status: response.status, error: response.statusText };
    } catch (err) {
      lastError = err.message;
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }
  }
  
  return { success: false, url, error: lastError || 'Max retries exceeded' };
}

async function batchFetch() {
  const results = [];
  const chunks = [];
  
  // Split into chunks for concurrent execution
  for (let i = 0; i < urls.length; i += maxConcurrent) {
    chunks.push(urls.slice(i, i + maxConcurrent));
  }
  
  for (const chunk of chunks) {
    const promises = chunk.map(url => fetchWithRetry(url, method, headers, retries));
    const chunkResults = await Promise.all(promises);
    results.push(...chunkResults);
  }
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  return {
    results,
    successful: successful.length,
    failed: failed.length,
    total: results.length
  };
}

batchFetch().then(result => {
  console.log(JSON.stringify(result));
}).catch(err => {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
});
