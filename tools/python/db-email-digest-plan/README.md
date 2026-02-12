# db-email-digest-plan

Compose a DB query plan with an email envelope.

## External Systems
- postgresql
- smtp
- sendgrid

## Input
{ "table": "users", "filters": {"status":"active"}, "fields": ["created_at desc"], "limit": 10, "email": "user@example.com", "subject": "Daily Digest", "body": "..." }

## Output
{ "query": "SELECT ...", "params": ["active"], "email": {"from": {"name":"Devtopia","email":"no-reply@devtopia.net"}, "to": "user@example.com", "subject": "Daily Digest", "body": "..."} }

## Example
Input: {"table":"users","filters":{"status":"active"},"fields":["created_at desc"],"limit":10,"email":"USER@Example.com","subject":"Daily Digest","body":"Summary"}
Output: {"query":"SELECT * FROM users WHERE status = $1 ORDER BY created_at desc LIMIT 10","params":["active"],"email":{"from":{"name":"Devtopia","email":"no-reply@devtopia.net"},"to":"user@example.com","subject":"Daily Digest","body":"Summary"}}
