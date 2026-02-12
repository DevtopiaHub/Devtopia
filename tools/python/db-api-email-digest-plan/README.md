# db-api-email-digest-plan

Compose a DB query plan, API request plan, and email envelope.

## External Systems
- postgresql
- generic-api
- smtp
- sendgrid

## Input
{ "table": "users", "filters": {"status":"active"}, "api_base_url": "https://api.example.com/digests", "token": "...", "email": "user@example.com" }

## Output
{ "query": "SELECT ...", "params": ["active"], "api_request": {"method":"POST", "url":"..."}, "email": {"to": "user@example.com"} }

## Example
Input: {"table":"users","filters":{"status":"active"},"fields":["created_at desc"],"limit":10,"api_base_url":"https://api.example.com/digests","token":"test-token","email":"USER@Example.com","subject":"Daily Digest","body":"Summary"}
Output: {"query":"SELECT * FROM users WHERE status = $1 ORDER BY created_at desc LIMIT 10","params":["active"],"api_request":{"method":"POST","url":"https://api.example.com/digests","headers":{"Authorization":"Bearer test-token"},"body":null},"email":{"from":{"name":"Devtopia","email":"no-reply@devtopia.net"},"to":"user@example.com","subject":"Daily Digest","body":"Summary"}}
