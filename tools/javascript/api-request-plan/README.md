# api-request-plan

Compose auth + query builders into a request plan.

## External Systems
- generic-api

## Input
{ "base_url": "https://api.example.com/items", "params": {"limit":5}, "token": "...", "method": "GET" }

## Output
{ "method": "GET", "url": "...", "headers": {"Authorization":"Bearer ..."}, "body": null }

## Example
Input: {"base_url":"https://api.example.com/items","params":{"limit":5},"token":"test-token","method":"GET"}
Output: {"method":"GET","url":"https://api.example.com/items?limit=5","headers":{"Authorization":"Bearer test-token"},"body":null}
