/**
 * text-lines
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { text, trim_empty = true } = input;
  if (typeof text !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
    process.exit(1);
  }
  let lines = text.split(/\r?\n/);
  if (trim_empty) lines = lines.filter(l => l.trim().length > 0);
  console.log(JSON.stringify({ ok: true, lines, count: lines.length }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
