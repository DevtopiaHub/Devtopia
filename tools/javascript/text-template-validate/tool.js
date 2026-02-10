const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.template || typeof input.template !== 'string') { console.log(JSON.stringify({ ok: false, error: 'Missing field: template' })); process.exit(1); }
if (!input.data || typeof input.data !== 'object') { console.log(JSON.stringify({ ok: false, error: 'Missing field: data (object)' })); process.exit(1); }
if (!input.required || !Array.isArray(input.required)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: required (array)' })); process.exit(1); }
try {
  const validated = devtopiaRun('schema-required', { object: input.data, required: input.required });
  if (!validated.ok) { console.log(JSON.stringify({ ok: false, error: validated.error })); process.exit(1); }
  const filled = devtopiaRun('text-template-fill', { template: input.template, data: input.data });
  if (!filled.ok) { console.log(JSON.stringify({ ok: false, error: filled.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, template: input.template, data: input.data, filled: filled.result, steps: ["schema-required","text-template-fill"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
