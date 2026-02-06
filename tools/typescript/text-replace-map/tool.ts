/**
 * text-replace-map
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { text, replacements } = input;
  if (typeof text !== 'string' || !replacements || typeof replacements !== 'object' || Array.isArray(replacements)) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text, replacements' }));
    process.exit(1);
  }
  let out = text;
  for (const [from, to] of Object.entries(replacements)) {
    out = out.split(String(from)).join(String(to));
  }
  console.log(JSON.stringify({ ok: true, text: out }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
