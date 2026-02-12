/**
 * email-send-mailgun
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { api_key, domain, from, to, subject, text } = input;
  if (!api_key || !domain) throw new Error('Missing required fields: api_key, domain');
  if (!from || !to || !subject) throw new Error('Missing required fields: from, to, subject');
  const auth = Buffer.from(`api:${api_key}`).toString('base64');
  const body = new URLSearchParams({ from, to, subject, text: text || '' });
  const res = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`
    },
    body
  });
  console.log(JSON.stringify({ ok: res.ok, status: res.status }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
