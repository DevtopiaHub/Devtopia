/**
 * data-aggregate-sources
 * Builds on: web-fetch-json, json-parse-safe (via devtopia-runtime)
 *
 * Fetch JSON data from multiple sources and aggregate into a single result.
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { sources, aggregate_key } = input;

  if (!sources || !Array.isArray(sources) || sources.length === 0) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: sources (array of URLs or JSON strings)' }));
    process.exit(1);
  }

  // Fetch and parse all sources
  const aggregated = [];
  const errors = [];

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    try {
      let data = null;

      // If source is a URL, fetch it
      if (typeof source === 'string' && (source.startsWith('http://') || source.startsWith('https://'))) {
        const fetched = devtopiaRun('web-fetch-json', { url: source });
        if (fetched && fetched.ok && fetched.json) {
          data = fetched.json;
        } else {
          errors.push({ source, index: i, error: fetched?.error || 'Failed to fetch URL' });
          continue;
        }
      } else {
        // If source is a JSON string, parse it
        const jsonStr = typeof source === 'string' ? source : JSON.stringify(source);
        const parsed = devtopiaRun('json-parse-safe', { text: jsonStr });
        if (parsed && parsed.ok && parsed.value) {
          data = parsed.value;
        } else {
          errors.push({ source, index: i, error: parsed?.error || 'Failed to parse JSON' });
          continue;
        }
      }

      // Add to aggregated results
      if (aggregate_key && typeof data === 'object' && data !== null) {
        aggregated.push({ [aggregate_key]: data });
      } else {
        aggregated.push(data);
      }
    } catch (err) {
      errors.push({ source, index: i, error: err.message || 'Unknown error' });
    }
  }

  console.log(JSON.stringify({
    ok: true,
    total: sources.length,
    successful: aggregated.length,
    failed: errors.length,
    aggregated,
    errors: errors.length > 0 ? errors : undefined,
  }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
