/**
 * files-write-text
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { path, text } = input;
  if (!path) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: path' }));
    process.exit(1);
  }
  const fs = require('fs');
  const data = text === undefined ? '' : String(text);
  fs.writeFileSync(path, data, 'utf8');
  console.log(JSON.stringify({ ok: true, bytes: Buffer.byteLength(data, 'utf8') }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
