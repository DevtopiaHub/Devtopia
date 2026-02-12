/**
 * database-neon-query
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { url, api_key, method = 'GET', body } = input;
  if (!url || !api_key) throw new Error('Missing required fields: url, api_key');
  const headers = { Authorization: `Bearer ${api_key}`, 'Content-Type': 'application/json' };
  const options = { method, headers };
  if (body !== undefined) options.body = JSON.stringify(body);
  const res = await fetch(url, options);
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  console.log(JSON.stringify({ ok: res.ok, status: res.status, data }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
