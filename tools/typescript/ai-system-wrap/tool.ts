/**
 * ai-system-wrap
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { system, user } = input;
  if (typeof system !== 'string' || typeof user !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: system, user' }));
    process.exit(1);
  }
  const messages = [
    { role: 'system', content: system },
    { role: 'user', content: user },
  ];
  console.log(JSON.stringify({ ok: true, messages }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
