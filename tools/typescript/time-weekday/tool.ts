/**
 * time-weekday
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { iso } = input;
  const date = iso ? new Date(iso) : new Date();
  if (Number.isNaN(date.getTime())) {
    console.log(JSON.stringify({ ok: false, error: 'Invalid ISO date' }));
    process.exit(1);
  }
  const names = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const idx = date.getUTCDay();
  console.log(JSON.stringify({ ok: true, weekday: names[idx], index: idx }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
