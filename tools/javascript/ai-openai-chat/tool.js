/**
 * ai-openai-chat
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { api_key, model = 'gpt-4o-mini', messages } = input;
  if (!api_key) throw new Error('Missing required field: api_key');
  if (!Array.isArray(messages)) throw new Error('Missing required field: messages (array)');
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${api_key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model, messages })
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
