/**
 * email-send-postmark
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { server_token, from, to, subject, text } = input;
  if (!server_token) throw new Error('Missing required field: server_token');
  if (!from || !to || !subject) throw new Error('Missing required fields: from, to, subject');
  const res = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      'X-Postmark-Server-Token': server_token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ From: from, To: to, Subject: subject, TextBody: text || '' })
  });
  console.log(JSON.stringify({ ok: res.ok, status: res.status }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
