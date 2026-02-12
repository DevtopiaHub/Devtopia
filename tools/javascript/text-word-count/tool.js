/**
 * text-word-count
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { text } = input;
  if (typeof text !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
    process.exit(1);
  }
  const words = text.trim().split(/\s+/).filter(Boolean);
  console.log(JSON.stringify({ ok: true, count: words.length }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
