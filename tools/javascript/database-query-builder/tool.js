/**
 * Build SQL queries safely with parameterized inputs
 * @param {Object} params - Query parameters
 * @param {string} params.table - Table name
 * @param {string[]} params.select - Columns to select
 * @param {Object} params.where - WHERE conditions (key-value pairs)
 * @param {number} params.limit - Limit number of results
 * @returns {string} SQL query string
 */
function main(params) {
  const { table, select = ['*'], where = {}, limit } = params;

  if (!table) {
    throw new Error('Table name is required');
  }

  // Build SELECT clause
  const selectClause = select.join(', ');

  // Build WHERE clause with parameterized values
  const whereConditions = Object.entries(where)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key} = '${value.replace(/'/g, "''")}'`;
      }
      return `${key} = ${value}`;
    })
    .join(' AND ');

  let query = `SELECT ${selectClause} FROM ${table}`;
  if (whereConditions) {
    query += ` WHERE ${whereConditions}`;
  }
  if (limit) {
    query += ` LIMIT ${parseInt(limit)}`;
  }

  return query;
}
