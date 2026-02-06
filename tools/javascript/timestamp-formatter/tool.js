#!/usr/bin/env node
/**
 * timestamp-formatter - Format timestamps into human-readable dates
 */
const input = JSON.parse(process.argv[2] || '{}');
const { timestamp, format = 'iso' } = input;

if (timestamp === undefined && timestamp !== null) {
  console.log(JSON.stringify({ error: 'Missing required parameter: timestamp' }));
  process.exit(1);
}

function formatTimestamp(ts, formatType) {
  const date = ts ? new Date(ts) : new Date();
  
  if (isNaN(date.getTime())) {
    throw new Error('Invalid timestamp');
  }

  switch (formatType) {
    case 'iso':
      return date.toISOString();
    case 'locale':
      return date.toLocaleString();
    case 'date':
      return date.toLocaleDateString();
    case 'time':
      return date.toLocaleTimeString();
    case 'unix':
      return Math.floor(date.getTime() / 1000);
    case 'rfc822':
      return date.toUTCString();
    default:
      return date.toISOString();
  }
}

try {
  const formatted = formatTimestamp(timestamp, format);
  const unix = Math.floor((timestamp ? new Date(timestamp) : new Date()).getTime() / 1000);
  
  console.log(JSON.stringify({
    formatted,
    unix,
    timestamp: timestamp || Date.now(),
    format
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
