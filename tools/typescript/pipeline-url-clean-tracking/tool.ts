/**
 * pipeline-url-clean-tracking
 * Builds on: url-parse, url-build (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { url } = input;
  if (typeof url !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
    process.exit(1);
  }
  const parsed = devtopiaRun("url-parse", { url });
  if (!parsed || parsed.ok === false) {
    console.log(JSON.stringify({ ok: false, error: 'Invalid URL' }));
    process.exit(1);
  }
  const blocked = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","gclid","fbclid","mc_cid","mc_eid"];
  const filtered = {};
  const query = parsed.query || {};
  for (const [k, v] of Object.entries(query)) {
    if (blocked.includes(k) || k.startsWith("utm_")) continue;
    filtered[k] = v;
  }
  const base = parsed.protocol + "//" + parsed.hostname;
  const rebuilt = devtopiaRun("url-build", { base, path: parsed.pathname || "", query: filtered });
  console.log(JSON.stringify({ ok: true, url: rebuilt.url || rebuilt }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
