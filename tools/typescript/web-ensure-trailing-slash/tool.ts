/**
 * web-ensure-trailing-slash
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { url } = input;
  if (typeof url !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
    process.exit(1);
  }
  let target = url.trim();
  if (!target.includes('://')) { target = `https://${target}`; }
  const parsed = new URL(target);
  if (!parsed.pathname.endsWith('/')) {
    parsed.pathname = parsed.pathname + "/";
  }
  console.log(JSON.stringify({ ok: true, url: parsed.toString() }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
