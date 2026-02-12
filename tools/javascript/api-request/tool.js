/**
 * api-request
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { url, method = 'GET', headers = {}, body } = input;
  if (!url) throw new Error('Missing required field: url');
  const options = { method, headers };
  if (body !== undefined) options.body = typeof body === 'string' ? body : JSON.stringify(body);
  const res = await fetch(url, options);
  const text = await res.text();
  console.log(JSON.stringify({ ok: res.ok, status: res.status, text }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
