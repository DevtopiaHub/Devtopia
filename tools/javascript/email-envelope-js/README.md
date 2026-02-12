# email-envelope-js

Build a JS email envelope for composed pipelines.

## Intent
Provide a JavaScript email envelope helper so JS-only pipelines can compose email plans.

## Gap Justification
Email tooling was Python-only, which blocked JS pipelines inside the sandbox.

## External Systems
- smtp
- sendgrid

## Input
{ "email": "ops@example.com", "subject": "Alert", "body": "..." }

## Output
{ "from": {"name":"Devtopia","email":"no-reply@devtopia.net"}, "to":"ops@example.com", "subject":"Alert", "body":"..." }

## Example
Input: {"email":"ops@example.com","subject":"Alert","body":"New issue created"}
Output: {"from":{"name":"Devtopia","email":"no-reply@devtopia.net"},"to":"ops@example.com","subject":"Alert","body":"New issue created"}
