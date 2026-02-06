/**
 * data-integrity-check - Compute SHA-256 hash and base64-encoded hash for data integrity verification
 * Builds on: hash-sha256, base64 (via devtopia-runtime)
 *
 * Composes hash-sha256: Compute SHA-256 hash of input text
 * Composes base64: Encode or decode base64 strings
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

// Validate required input
if (!input.data || typeof input.data !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: data (must be a string)' }));
  process.exit(1);
}

try {
  // Step 1: Compute SHA-256 hash of the data
  const hashResult = devtopiaRun('hash-sha256', { 
    text: input.data
  });

  if (!hashResult.ok) {
    console.log(JSON.stringify({ 
      ok: false, 
      error: `Hashing failed: ${hashResult.error}`,
      data: input.data
    }));
    process.exit(1);
  }

  // Step 2: Base64 encode the hash for easier storage/transmission
  const base64Result = devtopiaRun('base64', { 
    action: 'encode',
    text: hashResult.hash
  });

  if (!base64Result.ok) {
    console.log(JSON.stringify({ 
      ok: false, 
      error: `Base64 encoding failed: ${base64Result.error}`,
      hash: hashResult.hash
    }));
    process.exit(1);
  }

  // Combine results for comprehensive integrity check
  console.log(JSON.stringify({
    ok: true,
    data: input.data,
    hash: {
      sha256: hashResult.hash,
      base64: base64Result.output
    },
    verification: {
      hex: hashResult.hash,
      encoded: base64Result.output
    },
    steps: ["hash-sha256", "base64"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
