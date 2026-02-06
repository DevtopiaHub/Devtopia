/**
 * text-camel-case
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { text } = input;
  if (typeof text !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
    process.exit(1);
  }
  const parts = text.trim().split(/[^a-zA-Z0-9]+/).filter(Boolean);
  if (parts.length === 0) {
    console.log(JSON.stringify({ ok: true, text: '' }));
    process.exit(0);
  }
  const [first, ...rest] = parts;
  const out = first.toLowerCase() + rest.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('');
  console.log(JSON.stringify({ ok: true, text: out }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
