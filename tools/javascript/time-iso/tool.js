/**
 * time-iso
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { timestamp } = input;
  const date = timestamp ? new Date(timestamp) : new Date();
  if (Number.isNaN(date.getTime())) {
    console.log(JSON.stringify({ ok: false, error: 'Invalid timestamp' }));
    process.exit(1);
  }
  console.log(JSON.stringify({ ok: true, iso: date.toISOString() }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
