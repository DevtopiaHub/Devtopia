/**
 * security-basic-auth
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { username, password } = input;
  if (typeof username !== 'string' || typeof password !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required fields: username, password' }));
    process.exit(1);
  }
  const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
  console.log(JSON.stringify({ ok: true, header: `Basic ${token}` }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
