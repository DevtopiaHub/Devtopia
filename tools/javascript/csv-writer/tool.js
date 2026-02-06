#!/usr/bin/env node
/**
 * csv-writer - Convert JSON arrays to CSV format
 */
const input = JSON.parse(process.argv[2] || '{}');
const { data, headers = null, delimiter = ',' } = input;

if (!Array.isArray(data) || data.length === 0) {
  console.log(JSON.stringify({ error: 'Missing required parameter: data (array)' }));
  process.exit(1);
}

function arrayToCSV(arr, headerRow, delimiter) {
  const lines = [];
  
  // Add headers if provided
  if (headerRow && headerRow.length > 0) {
    lines.push(headerRow.map(h => escapeCSVField(h)).join(delimiter));
  } else if (arr.length > 0 && typeof arr[0] === 'object' && arr[0] !== null) {
    // Auto-detect headers from first object
    const autoHeaders = Object.keys(arr[0]);
    lines.push(autoHeaders.map(h => escapeCSVField(h)).join(delimiter));
  }
  
  // Add data rows
  for (const row of arr) {
    if (Array.isArray(row)) {
      lines.push(row.map(cell => escapeCSVField(cell)).join(delimiter));
    } else if (typeof row === 'object' && row !== null) {
      const rowHeaders = headers || Object.keys(row);
      const values = rowHeaders.map(h => row[h] || '');
      lines.push(values.map(v => escapeCSVField(v)).join(delimiter));
    } else {
      lines.push(escapeCSVField(row));
    }
  }
  
  return lines.join('\n');
}

function escapeCSVField(field) {
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

try {
  const csv = arrayToCSV(data, headers, delimiter);
  
  console.log(JSON.stringify({
    csv,
    rows: data.length,
    delimiter
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
