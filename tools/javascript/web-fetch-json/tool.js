/**
 * web-fetch-json
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { url, headers = {}, timeout_ms = 10000 } = input;
  if (!url) throw new Error('Missing required field: url');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout_ms);
  const res = await fetch(url, { headers, signal: controller.signal });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  clearTimeout(timer);
  console.log(JSON.stringify({ ok: res.ok, status: res.status, data }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
