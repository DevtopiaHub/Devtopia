#!/usr/bin/env node
/**
 * search-engine - Search and filter data with multiple criteria
 * 
 * Search and filter data using text matching, regex, and validation.
 * Composes regex-tester, array-operations, and data-validator.
 * 
 * Usage: node search-engine.js '{"data": [...], "query": "test", "filters": {...}}'
 * 
 * Builds on: regex-tester, array-operations, data-validator
 */

const input = JSON.parse(process.argv[2] || '{}');

function searchData(data, query, filters) {
  let results = Array.isArray(data) ? data : [data];
  
  // Text search
  if (query) {
    const regex = new RegExp(query, 'i');
    results = results.filter(item => {
      const str = JSON.stringify(item);
      return regex.test(str);
    });
  }
  
  // Filter by criteria
  if (filters) {
    results = results.filter(item => {
      for (const [key, value] of Object.entries(filters)) {
        if (item[key] !== value) {
          return false;
        }
      }
      return true;
    });
  }
  
  return results;
}

async function main() {
  if (!input.data) {
    console.log(JSON.stringify({ error: 'Missing required field: data' }));
    process.exit(1);
  }
  
  try {
    const results = searchData(input.data, input.query, input.filters);
    console.log(JSON.stringify({
      success: true,
      query: input.query || null,
      filters: input.filters || null,
      results,
      count: results.length
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
