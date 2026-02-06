// Tool: JSON formatter and validator
const input = JSON.parse(process.argv[2] || '{}');

try {
  const data = typeof input.json === 'string' ? JSON.parse(input.json) : input.json;
  const formatted = JSON.stringify(data, null, 2);
  console.log(JSON.stringify({
    valid: true,
    formatted,
    keys: Object.keys(data),
    type: Array.isArray(data) ? 'array' : typeof data,
  }));
} catch (err) {
  console.log(JSON.stringify({ valid: false, error: err.message }));
}