/**
 * ai-anthropic-chat
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { api_key, model = 'claude-3-haiku-20240307', messages, max_tokens = 1024 } = input;
  if (!api_key) throw new Error('Missing required field: api_key');
  if (!Array.isArray(messages)) throw new Error('Missing required field: messages (array)');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': api_key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({ model, max_tokens, messages })
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
