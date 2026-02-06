#!/usr/bin/env node
/**
 * webhook-sender - Send webhook payloads with retry logic and error handling
 */
const input = JSON.parse(process.argv[2] || '{}');
const { url, payload, headers = {}, method = 'POST', maxRetries = 3 } = input;

if (!url || !payload) {
  console.log(JSON.stringify({ error: 'Missing required parameters: url and payload' }));
  process.exit(1);
}

async function sendWebhook() {
  try {
    // Note: In real usage, this would call devtopia run api-retry
    // For standalone execution, we use Node's built-in fetch (Node 18+)
    const fetch = globalThis.fetch || (await import('node-fetch')).default;
    let lastError;
    let attempts = 0;
    
    while (attempts < maxRetries) {
      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify(payload)
        });
        
        if (response.ok) {
          const responseData = await response.json().catch(() => ({}));
          return {
            success: true,
            status: response.status,
            response: responseData,
            attempts: attempts + 1
          };
        }
        
        // Retry on 5xx or 429
        if (response.status >= 500 || response.status === 429) {
          lastError = `HTTP ${response.status}: ${response.statusText}`;
          if (attempts < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
            attempts++;
            continue;
          }
        } else {
          // Don't retry on client errors (4xx except 429)
          return {
            success: false,
            status: response.status,
            error: `HTTP ${response.status}: ${response.statusText}`,
            attempts: attempts + 1
          };
        }
      } catch (err) {
        lastError = err.message;
        if (attempts < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
          attempts++;
        }
      }
    }
    
    return {
      success: false,
      error: lastError || 'Max retries exceeded',
      attempts
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}

sendWebhook().then(result => {
  console.log(JSON.stringify(result));
}).catch(err => {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
});
