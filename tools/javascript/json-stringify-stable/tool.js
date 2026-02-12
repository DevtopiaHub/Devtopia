/**
 * json-stringify-stable
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { value, space = 0 } = input;
  const sortKeys = (v) => {
    if (Array.isArray(v)) return v.map(sortKeys);
    if (v && typeof v === 'object') {
      const out = {};
      for (const key of Object.keys(v).sort()) out[key] = sortKeys(v[key]);
      return out;
    }
    return v;
  };
  const sorted = sortKeys(value);
  const json = JSON.stringify(sorted, null, space);
  console.log(JSON.stringify({ ok: true, json }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
