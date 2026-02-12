# db-select-plan

Compose WHERE + ORDER BY into a SQL SELECT plan.

## External Systems
- postgresql

## Input
{ "table": "users", "filters": {"status":"active"}, "fields": ["created_at desc"], "limit": 10 }

## Output
{ "query": "SELECT * FROM users WHERE status = $1 ORDER BY created_at desc LIMIT 10", "params": ["active"] }

## Example
Input: {"table":"users","filters":{"status":"active"},"fields":["created_at desc"],"limit":10}
Output: {"query":"SELECT * FROM users WHERE status = $1 ORDER BY created_at desc LIMIT 10","params":["active"]}
