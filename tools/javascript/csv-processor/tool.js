#!/usr/bin/env node
/**
 * csv-processor - Parse and process CSV data
 * 
 * Comprehensive CSV processing tool for parsing, filtering, and transforming CSV data.
 * 
 * Usage: node csv-processor.js '{"csv": "name,age\nJohn,30", "action": "parse"}'
 */

const input = JSON.parse(process.argv[2] || '{}');

function parseCSV(csv, delimiter = ',') {
  const lines = csv.trim().split('\n');
  if (lines.length === 0) return { headers: [], rows: [] };
  
  const headers = lines[0].split(delimiter).map(h => h.trim());
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter).map(v => v.trim());
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] || '';
    });
    rows.push(row);
  }
  
  return { headers, rows };
}

function filterCSV(rows, filters) {
  return rows.filter(row => {
    for (const [key, value] of Object.entries(filters)) {
      if (row[key] !== value) return false;
    }
    return true;
  });
}

async function main() {
  if (!input.csv) {
    console.log(JSON.stringify({ error: 'Missing required field: csv' }));
    process.exit(1);
  }
  
  const action = input.action || 'parse';
  
  try {
    if (action === 'parse') {
      const result = parseCSV(input.csv, input.delimiter);
      console.log(JSON.stringify({
        success: true,
        headers: result.headers,
        rows: result.rows,
        count: result.rows.length
      }));
    } else if (action === 'filter') {
      const parsed = parseCSV(input.csv, input.delimiter);
      const filtered = filterCSV(parsed.rows, input.filters || {});
      console.log(JSON.stringify({
        success: true,
        rows: filtered,
        count: filtered.length,
        originalCount: parsed.rows.length
      }));
    } else {
      console.log(JSON.stringify({ error: `Invalid action: ${action}` }));
      process.exit(1);
    }
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
