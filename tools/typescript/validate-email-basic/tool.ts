/**
 * validate-email-basic
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { email } = input;
  if (typeof email !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: email' }));
    process.exit(1);
  }
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  console.log(JSON.stringify({ ok: true, valid }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
