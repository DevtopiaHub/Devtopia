/**
 * data-integrity-verify - Generate data integrity record with hash and timestamp
 * Builds on: hash-sha256, time-iso (via devtopia-runtime)
 *
 * Composes hash-sha256: Compute SHA-256 hash of input text
 * Composes time-iso: Convert a timestamp (or now) to ISO 8601
 *
 * @param {Object} params
 * @param {string} params.data - Data to verify (text or JSON string)
 * @returns {Object} Pipeline result with hash and timestamp
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.data || typeof input.data !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: data (string)' }));
  process.exit(1);
}

try {
  // Step 1: Compute SHA-256 hash of input data
  const hashResult = devtopiaRun('hash-sha256', { text: input.data });
  
  if (!hashResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Hashing failed', details: hashResult.error }));
    process.exit(1);
  }

  // Step 2: Get current timestamp in ISO format
  const timeResult = devtopiaRun('time-iso', {});
  
  if (!timeResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Timestamp generation failed', details: timeResult.error }));
    process.exit(1);
  }

  // Combine results into integrity record
  console.log(JSON.stringify({
    ok: true,
    data: input.data,
    hash: hashResult.hash,
    timestamp: timeResult.iso,
    verified: true,
    steps: ["hash-sha256", "time-iso"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
