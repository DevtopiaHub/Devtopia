#!/usr/bin/env node
/**
 * api-monitor - Monitor API endpoints with health checks
 * 
 * Monitor API endpoints, check health status, and track response times.
 * Composes api-request, url-builder, and data-validator.
 * 
 * Usage: node api-monitor.js '{"url": "https://api.com/health", "interval": 60}'
 * 
 * Builds on: api-request, url-builder, data-validator
 */

const input = JSON.parse(process.argv[2] || '{}');

async function checkHealth(url, expectedSchema) {
  const startTime = Date.now();
  
  try {
    const response = await fetch(url);
    const responseTime = Date.now() - startTime;
    const text = await response.text();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    
    // Validate response if schema provided (composing data-validator)
    let validation = { valid: true };
    if (expectedSchema) {
      validation = validateData(data, expectedSchema);
    }
    
    return {
      url,
      status: response.status,
      healthy: response.ok && validation.valid,
      responseTime,
      data: validation.valid ? data : null,
      validation
    };
  } catch (err) {
    return {
      url,
      status: null,
      healthy: false,
      responseTime: Date.now() - startTime,
      error: err.message
    };
  }
}

function validateData(data, schema) {
  const errors = [];
  if (schema.type) {
    const actualType = Array.isArray(data) ? 'array' : typeof data;
    if (actualType !== schema.type) {
      errors.push(`Expected type ${schema.type}, got ${actualType}`);
    }
  }
  return { valid: errors.length === 0, errors };
}

async function main() {
  if (!input.url) {
    console.log(JSON.stringify({ error: 'Missing required field: url' }));
    process.exit(1);
  }
  
  try {
    const result = await checkHealth(input.url, input.expectedSchema);
    console.log(JSON.stringify({
      success: true,
      ...result,
      timestamp: new Date().toISOString()
    }));
    
    if (!result.healthy) {
      process.exit(1);
    }
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
