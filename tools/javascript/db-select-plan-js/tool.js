// db-select-plan-js - Build a SELECT query plan (JS version).
function main(params) {
  const table = typeof params?.table === 'string' ? params.table.trim() : '';
  if (!table) return { error: 'table required' };

  const filters = params?.filters && typeof params.filters === 'object' ? params.filters : {};
  const fields = Array.isArray(params?.fields) ? params.fields : [];
  const limit = Number.isInteger(params?.limit) ? params.limit : null;

  const whereParts = [];
  const values = [];
  let index = 1;
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined) continue;
    whereParts.push(`${key} = $${index}`);
    values.push(value);
    index += 1;
  }

  const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';
  const orderClause = fields.length ? `ORDER BY ${fields.join(', ')}` : '';
  const limitClause = Number.isInteger(limit) ? `LIMIT ${limit}` : '';
  const query = `SELECT * FROM ${table} ${whereClause} ${orderClause} ${limitClause}`.replace(/\s+/g, ' ').trim();

  return { query, params: values };
}
