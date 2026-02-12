/**
 * social-discord-webhook
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { webhook_url, content, username } = input;
  if (!webhook_url) throw new Error('Missing required field: webhook_url');
  if (!content) throw new Error('Missing required field: content');
  const res = await fetch(webhook_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, username })
  });
  console.log(JSON.stringify({ ok: res.ok, status: res.status }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
