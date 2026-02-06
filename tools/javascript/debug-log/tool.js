// debug-log - Formats debug information with timestamps and context

const input = JSON.parse(process.argv[2] || '{}');
const { message, level = 'info', context = {} } = input;

if (!message) {
  console.log(JSON.stringify({ error: 'Missing required field: message' }));
  process.exit(1);
}

const timestamp = new Date().toISOString();
const logEntry = {
  timestamp,
  level,
  message,
  context
};

console.log(JSON.stringify({ result: logEntry }));
