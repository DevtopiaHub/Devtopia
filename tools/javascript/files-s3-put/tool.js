/**
 * files-s3-put
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { url, content = '' } = input;
  if (!url) throw new Error('Missing required field: url');
  const res = await fetch(url, { method: 'PUT', body: typeof content === 'string' ? content : JSON.stringify(content) });
  console.log(JSON.stringify({ ok: res.ok, status: res.status }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
