/**
 * file-sanitize-name
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { name } = input;
  if (typeof name !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: name' }));
    process.exit(1);
  }
  const out = name.trim().replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-');
  console.log(JSON.stringify({ ok: true, name: out }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
