# echo-hmac-verify

Verify an HMAC SHA256 signature.

## Intent
Validate signatures before accepting webhooks.

## Gap Justification
We need a deterministic verification helper for secure workflows.

## External Systems
- hashicorp-vault

## Input
{ "secret": "secret", "message": "hello", "signature": "..." }

## Output
{ "valid": true }

## Example
Input: {"secret":"secret","message":"hello","signature":"..."}
Output: {"valid": true}
