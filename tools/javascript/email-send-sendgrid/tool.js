/**
 * email-send-sendgrid
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { api_key, from, to, subject, text } = input;
  if (!api_key) throw new Error('Missing required field: api_key');
  if (!from || !to || !subject) throw new Error('Missing required fields: from, to, subject');
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${api_key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from },
      subject,
      content: [{ type: 'text/plain', value: text || '' }]
    })
  });
  console.log(JSON.stringify({ ok: res.ok, status: res.status }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
