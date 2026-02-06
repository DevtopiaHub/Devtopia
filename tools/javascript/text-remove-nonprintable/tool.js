/**
 * text-remove-nonprintable
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { text } = input;
  if (typeof text !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
    process.exit(1);
  }
  const cleaned = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  console.log(JSON.stringify({ ok: true, text: cleaned }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
