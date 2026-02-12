/**
 * files-read-text
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { path, encoding = 'utf8' } = input;
  if (!path) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: path' }));
    process.exit(1);
  }
  const fs = require('fs');
  const text = fs.readFileSync(path, encoding);
  console.log(JSON.stringify({ ok: true, text }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
