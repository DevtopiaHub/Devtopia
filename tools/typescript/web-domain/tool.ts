/**
 * web-domain
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { url } = input;
  if (typeof url !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
    process.exit(1);
  }
  try {
    const hostname = new URL(url).hostname;
    console.log(JSON.stringify({ ok: true, domain: hostname }));
  } catch {
    console.log(JSON.stringify({ ok: false, error: 'Invalid URL' }));
    process.exit(1);
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
