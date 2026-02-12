# email-envelope

Build an email envelope using normalized, validated addresses.

## External Systems
- smtp
- sendgrid

## Input
{ "email": "USER@Example.com", "subject": "Hello", "body": "Hi" }

## Output
{ "from": {"name":"Devtopia","email":"no-reply@devtopia.net"}, "to": "user@example.com", "subject": "Hello", "body": "Hi" }

## Example
Input: {"email":"USER@Example.com","subject":"Hello","body":"Hi there","from_name":"Devtopia"}
Output: {"from":{"name":"Devtopia","email":"no-reply@devtopia.net"},"to":"user@example.com","subject":"Hello","body":"Hi there"}
