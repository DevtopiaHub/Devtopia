/**
 * mime-from-extension
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { filename } = input;
  if (typeof filename !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: filename' }));
    process.exit(1);
  }
  const ext = filename.includes('.') ? filename.split('.').pop() : filename;
  const normalized = '.' + String(ext || '').toLowerCase().replace(/^\.+/, '');
  const map = {
    '.json': 'application/json',
    '.txt': 'text/plain',
    '.csv': 'text/csv',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
  };
  const mime = map[normalized] || 'application/octet-stream';
  console.log(JSON.stringify({ ok: true, extension: normalized, mime }));
      
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
