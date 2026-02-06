/**
 * web-url-join
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { base, path: rel } = input;
  if (typeof rel !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: path' }));
    process.exit(1);
  }
  try {
    const url = base ? new URL(rel, base).toString() : new URL(rel).toString();
    console.log(JSON.stringify({ ok: true, url }));
  } catch {
    console.log(JSON.stringify({ ok: false, error: 'Invalid URL' }));
    process.exit(1);
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
