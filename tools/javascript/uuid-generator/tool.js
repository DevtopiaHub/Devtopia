#!/usr/bin/env node
/**
 * uuid-generator - Generate UUIDs (v4) and other unique identifiers
 */
const input = JSON.parse(process.argv[2] || '{}');
const { count = 1, format = 'uuid' } = input;

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function generateShortId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function generateNumericId(length = 8) {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
}

try {
  const results = [];
  for (let i = 0; i < count; i++) {
    let id;
    switch (format) {
      case 'uuid':
        id = generateUUID();
        break;
      case 'short':
        id = generateShortId();
        break;
      case 'numeric':
        id = generateNumericId();
        break;
      default:
        id = generateUUID();
    }
    results.push(id);
  }

  console.log(JSON.stringify({
    ids: results,
    count: results.length,
    format
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
