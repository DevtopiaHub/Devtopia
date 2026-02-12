/**
 * api-request-json
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { url, method = 'GET', headers = {}, body } = input;
  if (!url) throw new Error('Missing required field: url');
  const options = { method, headers: { ...headers, 'Content-Type': 'application/json' } };
  if (body !== undefined) options.body = typeof body === 'string' ? body : JSON.stringify(body);
  const res = await fetch(url, options);
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  console.log(JSON.stringify({ ok: res.ok, status: res.status, data }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
