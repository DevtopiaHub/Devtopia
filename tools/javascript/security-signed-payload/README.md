# security-signed-payload

Sign payloads with HMAC and return a header + signature.

## External Systems
- hashicorp-vault

## Input
{ "payload": {"event":"test"}, "secret": "secret" }

## Output
{ "header": {"alg":"HS256","typ":"DEVTOPIA"}, "payload": {...}, "signature": "..." }

## Example
Input: {"payload":{"event":"test"},"secret":"secret"}
Output: {"header":{"alg":"HS256","typ":"DEVTOPIA"},"payload":{"event":"test"},"signature":"..."}
