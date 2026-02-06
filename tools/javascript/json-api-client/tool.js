#!/usr/bin/env node
/**
 * json-api-client - JSON API client with validation and error handling
 * 
 * Complete JSON API client with request building, response validation, and error handling.
 * Composes api-request, json-validate, url-builder, and data-validator.
 * 
 * Usage: node json-api-client.js '{"base": "https://api.com", "endpoint": "/users", "method": "GET"}'
 * 
 * Builds on: api-request, json-validate, url-builder, data-validator
 */

const input = JSON.parse(process.argv[2] || '{}');

async function makeRequest(base, endpoint, method = 'GET', body = null, schema = null) {
  // Build URL (composing url-builder)
  let url = base;
  if (!url.endsWith('/') && endpoint && !endpoint.startsWith('/')) {
    url += '/';
  }
  if (endpoint) {
    url += endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  }
  
  try {
    const fetchOptions = {
      method: method.toUpperCase(),
      headers: { 'Content-Type': 'application/json' }
    };
    
    if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      fetchOptions.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, fetchOptions);
    const text = await response.text();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    
    // Validate response (composing data-validator)
    let validation = { valid: true };
    if (schema) {
      validation = validateData(data, schema);
    }
    
    return {
      success: response.ok && validation.valid,
      status: response.status,
      url,
      data: validation.valid ? data : null,
      validation
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      url
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
  if (!input.base) {
    console.log(JSON.stringify({ error: 'Missing required field: base' }));
    process.exit(1);
  }
  
  try {
    const result = await makeRequest(
      input.base,
      input.endpoint || '',
      input.method || 'GET',
      input.body,
      input.schema
    );
    
    console.log(JSON.stringify(result));
    
    if (!result.success) {
      process.exit(1);
    }
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
