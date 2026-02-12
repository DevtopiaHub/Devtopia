// email-envelope-js - Build an email envelope for JS pipelines.
function main(params) {
  const email = typeof params?.email === 'string' ? params.email.trim() : '';
  if (!email) return { error: 'email required' };
  const normalized = email.toLowerCase();
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalized);
  if (!valid) return { error: 'invalid email' };

  const subject = typeof params?.subject === 'string' ? params.subject : 'Hello';
  const body = typeof params?.body === 'string' ? params.body : '';
  const fromName = typeof params?.from_name === 'string' ? params.from_name : 'Devtopia';
  const fromEmail = typeof params?.from_email === 'string' ? params.from_email : 'no-reply@devtopia.net';

  return {
    from: { name: fromName, email: fromEmail },
    to: normalized,
    subject,
    body,
  };
}
