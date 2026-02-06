/**
 * time-from-unix
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { timestamp } = input;
  if (typeof timestamp !== 'number') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: timestamp' }));
    process.exit(1);
  }
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    console.log(JSON.stringify({ ok: false, error: 'Invalid timestamp' }));
    process.exit(1);
  }
  console.log(JSON.stringify({ ok: true, iso: date.toISOString() }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
