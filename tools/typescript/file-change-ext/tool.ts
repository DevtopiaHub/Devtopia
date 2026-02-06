/**
 * file-change-ext
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { path: p, ext } = input;
  if (typeof p !== 'string' || typeof ext !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: path, ext' }));
    process.exit(1);
  }
  const { dirname, basename, extname, join } = require('path');
  const base = basename(p, extname(p));
  const newExt = ext.startsWith('.') ? ext : '.' + ext;
  const out = join(dirname(p), base + newExt);
  console.log(JSON.stringify({ ok: true, path: out }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
