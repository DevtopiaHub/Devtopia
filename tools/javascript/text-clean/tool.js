/**
 * text-clean
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { text, lowercase = true, collapse_whitespace = true } = input;
  if (typeof text !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
    process.exit(1);
  }
  let out = text.trim();
  if (collapse_whitespace) out = out.replace(/\s+/g, ' ');
  if (lowercase) out = out.toLowerCase();
  console.log(JSON.stringify({ ok: true, cleaned: out }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
