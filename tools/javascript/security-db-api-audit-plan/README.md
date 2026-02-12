# security-db-api-audit-plan

Create a signed DB query plan plus an API request plan for audit workflows.

## External Systems
- postgresql
- generic-api
- hashicorp-vault

## Input
{ "table": "events", "filters": {"type":"login"}, "base_url": "https://api.example.com/audit", "token": "...", "secret": "..." }

## Output
{ "db_query": {"query":"...","params":[...]}, "api_request": {"method":"POST","url":"...","headers":{...},"body":{...}}, "signature": "..." }

## Example
Input: {"table":"events","filters":{"type":"login"},"limit":50,"base_url":"https://api.example.com/audit","token":"test-token","secret":"secret"}
Output: {"db_query":{"query":"SELECT * FROM events WHERE type = $1 LIMIT 50","params":["login"]},"api_request":{"method":"POST","url":"https://api.example.com/audit","headers":{"Authorization":"Bearer test-token","X-Devtopia-Signature":"..."},"body":{"query":"SELECT * FROM events WHERE type = $1 LIMIT 50","params":["login"],"meta":{}}},"signature":"..."}