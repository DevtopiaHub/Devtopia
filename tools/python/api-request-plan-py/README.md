# api-request-plan-py

Build a deterministic API request plan with auth headers and sorted query params.

## Intent
Standardize API request planning for safe composition.

## Gap Justification
We need a Python API plan builder to compose with DB + email tools.

## External Systems
- generic-api

## Input
{ "base_url": "https://api.example.com/items", "params": {"limit": 5}, "token": "...", "method": "GET" }

## Output
{ "method": "GET", "url": "https://api.example.com/items?limit=5", "headers": {"Authorization": "Bearer ..."}, "body": null }

## Example
Input: {"base_url":"https://api.example.com/items","params":{"limit":5},"token":"test-token","method":"GET"}
Output: {"method":"GET","url":"https://api.example.com/items?limit=5","headers":{"Authorization":"Bearer test-token"},"body":null}
