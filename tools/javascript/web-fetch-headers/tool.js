/**
 * web-fetch-headers
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { url, headers = {}, timeout_ms = 10000 } = input;
  if (!url) throw new Error('Missing required field: url');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout_ms);
  const res = await fetch(url, { method: 'HEAD', headers, signal: controller.signal });
  clearTimeout(timer);
  const headersOut = Object.fromEntries(res.headers.entries());
  console.log(JSON.stringify({ ok: res.ok, status: res.status, headers: headersOut }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
