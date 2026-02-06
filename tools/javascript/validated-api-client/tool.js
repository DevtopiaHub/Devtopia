#!/usr/bin/env node
/**
 * validated-api-client - API client with JSON schema validation
 * 
 * A robust API client that combines HTTP requests with JSON validation.
 * Composes api-request, json-validate, and url-parser to provide a complete
 * solution for making validated API calls.
 * 
 * Usage: node validated-api-client.js '{"url": "https://api.example.com/users", "schema": {"type": "object", "required": ["id"]}}'
 * 
 * Options:
 * - url: API endpoint URL (required)
 * - method: HTTP method (default: GET)
 * - body: Request body object
 * - headers: Custom headers
 * - schema: JSON schema to validate response against
 * - validateRequest: Whether to validate request body (default: false)
 * 
 * Builds on: api-request, json-validate, url-parser
 */

const input = JSON.parse(process.argv[2] || '{}');

// Simple JSON schema validator (composing json-validate)
function validateJson(data, schema) {
  if (!schema) return { valid: true };
  
  const errors = [];
  
  // Type validation
  if (schema.type) {
    const actualType = Array.isArray(data) ? 'array' : typeof data;
    if (actualType !== schema.type) {
      errors.push(`Expected type ${schema.type}, got ${actualType}`);
    }
  }
  
  // Required fields
  if (schema.required && Array.isArray(schema.required)) {
    for (const field of schema.required) {
      if (!(field in data)) {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }
  
  // Properties validation
  if (schema.properties && typeof data === 'object' && !Array.isArray(data)) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      if (key in data) {
        const result = validateJson(data[key], propSchema);
        if (!result.valid) {
          errors.push(`Field '${key}': ${result.errors.join(', ')}`);
        }
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Parse URL (composing url-parser)
function parseUrl(url) {
  try {
    const urlObj = new URL(url);
    return {
      valid: true,
      protocol: urlObj.protocol.replace(':', ''),
      host: urlObj.host,
      pathname: urlObj.pathname,
      search: urlObj.search
    };
  } catch (err) {
    return {
      valid: false,
      error: err.message
    };
  }
}

async function main() {
  if (!input.url) {
    console.log(JSON.stringify({ error: 'Missing required field: url' }));
    process.exit(1);
  }

  try {
    // Validate URL (composing url-parser)
    const urlInfo = parseUrl(input.url);
    if (!urlInfo.valid) {
      console.log(JSON.stringify({ 
        error: `Invalid URL: ${urlInfo.error}` 
      }));
      process.exit(1);
    }
    
    // Validate request body if schema provided (composing json-validate)
    if (input.validateRequest && input.body && input.requestSchema) {
      const validation = validateJson(input.body, input.requestSchema);
      if (!validation.valid) {
        console.log(JSON.stringify({
          error: 'Request validation failed',
          validationErrors: validation.errors
        }));
        process.exit(1);
      }
    }
    
    // Make API request (composing api-request)
    const method = (input.method || 'GET').toUpperCase();
    const headers = {
      'Content-Type': 'application/json',
      ...(input.headers || {})
    };
    
    const fetchOptions = {
      method,
      headers
    };
    
    if (['POST', 'PUT', 'PATCH'].includes(method) && input.body) {
      fetchOptions.body = typeof input.body === 'string' 
        ? input.body 
        : JSON.stringify(input.body);
    }
    
    const response = await fetch(input.url, fetchOptions);
    const text = await response.text();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    
    // Validate response (composing json-validate)
    let validation = { valid: true };
    if (input.schema) {
      validation = validateJson(data, input.schema);
    }
    
    console.log(JSON.stringify({
      success: response.ok && validation.valid,
      status: response.status,
      statusText: response.statusText,
      url: input.url,
      method,
      data: validation.valid ? data : null,
      rawResponse: !validation.valid ? text.slice(0, 200) : null,
      validation: {
        valid: validation.valid,
        errors: validation.errors || []
      },
      urlInfo
    }));
    
    if (!response.ok || !validation.valid) {
      process.exit(1);
    }
  } catch (err) {
    console.log(JSON.stringify({ 
      error: err.message,
      url: input.url 
    }));
    process.exit(1);
  }
}

main();
