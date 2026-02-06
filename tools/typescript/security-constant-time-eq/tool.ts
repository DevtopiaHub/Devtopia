/**
 * security-constant-time-eq
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { a, b } = input;
  if (typeof a !== 'string' || typeof b !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: a, b' }));
    process.exit(1);
  }
  const { timingSafeEqual } = require("crypto");
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    console.log(JSON.stringify({ ok: true, equal: false }));
    process.exit(0);
  }
  const equal = timingSafeEqual(bufA, bufB);
  console.log(JSON.stringify({ ok: true, equal }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
