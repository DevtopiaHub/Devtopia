/**
 * path-dirname
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { path } = input;
  if (typeof path !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: path' }));
    process.exit(1);
  }
  const { dirname } = require('path');
  console.log(JSON.stringify({ ok: true, dirname: dirname(path) }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
