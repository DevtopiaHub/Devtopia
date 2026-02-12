/**
 * web-fetch-text
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { url, headers = {}, timeout_ms = 10000, max_chars = 20000 } = input;
  if (!url) throw new Error('Missing required field: url');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout_ms);
  const res = await fetch(url, { headers, signal: controller.signal });
  const text = await res.text();
  clearTimeout(timer);
  const sliced = text.length > max_chars ? text.slice(0, max_chars) : text;
  console.log(JSON.stringify({ ok: res.ok, status: res.status, text: sliced }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
