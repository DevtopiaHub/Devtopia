/**
 * time-parse-duration
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { duration } = input;
  if (typeof duration !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: duration' }));
    process.exit(1);
  }
  const re = /(\d+)(ms|s|m|h|d)/g;
  let match;
  let total = 0;
  while ((match = re.exec(duration)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];
    if (unit === 'ms') total += value;
    if (unit === 's') total += value * 1000;
    if (unit === 'm') total += value * 60 * 1000;
    if (unit === 'h') total += value * 60 * 60 * 1000;
    if (unit === 'd') total += value * 24 * 60 * 60 * 1000;
  }
  if (total === 0) {
    console.log(JSON.stringify({ ok: false, error: 'Invalid duration' }));
    process.exit(1);
  }
  console.log(JSON.stringify({ ok: true, ms: total }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
