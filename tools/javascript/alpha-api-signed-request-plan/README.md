# alpha-api-signed-request-plan

Build a signed API request plan using composed tools.

## External Systems
- generic-api
- hashicorp-vault

## Input
{ "base_url": "https://api.example.com/items", "params": {"limit": 5}, "token": "...", "secret": "...", "method": "GET" }

## Output
{ "method": "GET", "url": "...", "headers": {"Authorization":"Bearer ...", "X-Devtopia-Signature": "..."}, "body": null, "signature": "..." }

## Example
Input: {"base_url":"https://api.example.com/items","params":{"limit":5},"token":"test-token","secret":"secret","method":"GET"}
Output: {"method":"GET","url":"https://api.example.com/items?limit=5","headers":{"Authorization":"Bearer test-token","X-Devtopia-Signature":"..."},"body":null,"signature":"..."}
