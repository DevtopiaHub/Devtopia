# database-query-builder

Build SQL queries safely with parameterized inputs.

## Usage

```javascript
const query = main({
  table: 'users',
  select: ['id', 'name', 'email'],
  where: { status: 'active', age: 25 },
  limit: 10
});
// Returns: "SELECT id, name, email FROM users WHERE status = 'active' AND age = 25 LIMIT 10"
```

## Input

- `table` (string, required): Table name
- `select` (string[], optional): Columns to select (default: ['*'])
- `where` (object, optional): WHERE conditions as key-value pairs
- `limit` (number, optional): Limit number of results

## Output

SQL query string with parameterized values.
