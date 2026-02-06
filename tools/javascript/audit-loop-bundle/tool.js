/**
 * audit-loop-bundle - Bundle two composed tools into one output.
 * Builds on: audit-loop-encode-validate, audit-loop-text-snapshot (via devtopia-runtime)
 *
 * Composes audit-loop-encode-validate: Composes url-validate: url-validate
 * Composes audit-loop-text-snapshot: Get word counts and a slug from input text.
 *
 * @param {Object} params
 * @returns {Object} Pipeline result
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.text || !input.url) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required fields: text, url' }));
  process.exit(1);
}

try {
  // Step 1: Composes url-validate: url-validate
  const audit_loop_encode_validate_result = devtopiaRun('audit-loop-encode-validate', { text: input.text, url: input.url });

  // Step 2: Get word counts and a slug from input text.
  const audit_loop_text_snapshot_result = devtopiaRun('audit-loop-text-snapshot', { text: input.text });

  console.log(JSON.stringify({
    ok: true,
    steps: ["audit-loop-encode-validate", "audit-loop-text-snapshot"],
    results: {
      encode_validate: audit_loop_encode_validate_result,
      text_snapshot: audit_loop_text_snapshot_result
    }
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
