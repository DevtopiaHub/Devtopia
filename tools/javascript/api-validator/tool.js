#!/usr/bin/env node
/**
 * api-validator - Validate API responses against JSON schemas with retry logic
 */
const input = JSON.parse(process.argv[2] || '{}');
const { url, schema, method = 'GET', headers = {}, body = null } = input;

if (!url || !schema) {
  console.log(JSON.stringify({ error: 'Missing required parameters: url and schema' }));
  process.exit(1);
}

// Simulate calling api-retry and json-validate
// In a real implementation, these would be called via devtopia run
async function validateAPI() {
  try {
    // Step 1: Make API request with retry logic (using api-retry pattern)
    // Note: In real usage, this would call devtopia run api-retry
    // For standalone execution, we use Node's built-in fetch (Node 18+)
    const fetch = globalThis.fetch || (await import('node-fetch')).default;
    let response;
    let attempts = 0;
    const maxRetries = 3;
    
    while (attempts < maxRetries) {
      try {
        response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json', ...headers },
          body: body ? JSON.stringify(body) : undefined
        });
        
        if (response.ok || attempts === maxRetries - 1) break;
        
        // Retry on 5xx or 429
        if (response.status >= 500 || response.status === 429) {
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
          attempts++;
          continue;
        }
        break;
      } catch (err) {
        if (attempts === maxRetries - 1) throw err;
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
        attempts++;
      }
    }
    
    if (!response.ok) {
      return {
        valid: false,
        error: `API request failed: ${response.status} ${response.statusText}`,
        status: response.status
      };
    }
    
    const data = await response.json();
    
    // Step 2: Validate response against schema (using json-validate pattern)
    function validateSchema(json, schema) {
      for (const key in schema) {
        if (!(key in json)) {
          return { valid: false, error: `Missing required field: ${key}` };
        }
        const expectedType = schema[key];
        const actualType = typeof json[key];
        
        if (expectedType === 'array' && !Array.isArray(json[key])) {
          return { valid: false, error: `Field ${key} should be array, got ${actualType}` };
        }
        if (expectedType !== 'array' && actualType !== expectedType) {
          return { valid: false, error: `Field ${key} should be ${expectedType}, got ${actualType}` };
        }
      }
      return { valid: true };
    }
    
    const validation = validateSchema(data, schema);
    
    return {
      ...validation,
      data: validation.valid ? data : null,
      attempts: attempts + 1
    };
  } catch (err) {
    return {
      valid: false,
      error: err.message
    };
  }
}

validateAPI().then(result => {
  console.log(JSON.stringify(result));
}).catch(err => {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
});
