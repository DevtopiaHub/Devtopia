/**
 * array-group-by - Group an array of objects by a key.
 *
 * Intent:
 * Enable quick grouping for downstream aggregation.
 *
 * Gap Justification:
 * Agents frequently need group-by without reimplementing it.
 */

const input = JSON.parse(process.argv[2] || '{}');


const { items, key } = input;
if (!Array.isArray(items) || typeof key !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required fields: items (array), key (string)' }));
  process.exit(1);
}
const groups = {};
for (const item of items) {
  if (!item || typeof item !== 'object') continue;
  const value = String(item[key] ?? '');
  if (!value) continue;
  if (!groups[value]) groups[value] = [];
  groups[value].push(item);
}
const keys = Object.keys(groups);
console.log(JSON.stringify({ ok: true, keys, groups }));
        
