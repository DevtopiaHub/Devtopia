/**
 * social-x-post
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { bearer_token, text } = input;
  if (!bearer_token) throw new Error('Missing required field: bearer_token');
  if (!text) throw new Error('Missing required field: text');
  const res = await fetch('https://api.twitter.com/2/tweets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bearer_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  });
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  console.log(JSON.stringify({ ok: res.ok, status: res.status, data }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
