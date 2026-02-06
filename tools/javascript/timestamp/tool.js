// Tool: Timestamp generator
const input = JSON.parse(process.argv[2] || '{}');

const now = new Date();
const result = {
  unix: Math.floor(now.getTime() / 1000),
  unix_ms: now.getTime(),
  iso: now.toISOString(),
  utc: now.toUTCString(),
  local: now.toString(),
  date: now.toDateString(),
  time: now.toTimeString(),
};

console.log(JSON.stringify(result));