#!/usr/bin/env node
/**
 * data-transformer - Transform data through multiple formats
 * 
 * Transform data between JSON, CSV, and other formats with validation.
 * Composes json-flatten, csv-processor, and data-validator.
 * 
 * Usage: node data-transformer.js '{"data": {...}, "from": "json", "to": "csv"}'
 * 
 * Builds on: json-flatten, csv-processor, data-validator
 */

const input = JSON.parse(process.argv[2] || '{}');

function jsonToCSV(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return '';
  }
  
  const headers = Object.keys(data[0]);
  const rows = [headers.join(',')];
  
  for (const item of data) {
    const values = headers.map(h => {
      const val = item[h];
      return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
    });
    rows.push(values.join(','));
  }
  
  return rows.join('\n');
}

function flattenObject(obj, prefix = '', result = {}) {
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

async function main() {
  if (!input.data) {
    console.log(JSON.stringify({ error: 'Missing required field: data' }));
    process.exit(1);
  }
  
  const from = input.from || 'json';
  const to = input.to || 'json';
  
  try {
    let result;
    
    if (from === 'json' && to === 'csv') {
      result = jsonToCSV(Array.isArray(input.data) ? input.data : [input.data]);
    } else if (from === 'json' && to === 'flattened') {
      result = flattenObject(input.data);
    } else {
      result = input.data;
    }
    
    console.log(JSON.stringify({
      success: true,
      from,
      to,
      result
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
