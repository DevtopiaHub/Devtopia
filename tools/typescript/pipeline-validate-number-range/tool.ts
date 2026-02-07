/**
 * pipeline-validate-number-range
 * Builds on: validate-between, validate-array-min-length
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const value = input.value;
  const min = input.min;
  const max = input.max;
  const list = input.items ?? input.list ?? input.values ?? input.array ?? input.valueList ?? input.value;
  const minLen = input.min_len ?? input.minLen ?? input.min_length ?? input.min;

  const numberResult = devtopiaRun('validate-between', { value, min, max });
  const arrayResult = devtopiaRun('validate-array-min-length', { value: list, min: minLen });

  console.log(JSON.stringify({
    ok: true,
    results: {
      'validate-between': numberResult,
      'validate-array-min-length': arrayResult,
    },
  }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
