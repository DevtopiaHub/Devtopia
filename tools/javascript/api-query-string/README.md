# api-query-string

Build a URL with sorted query parameters.

## Intent
Make API URLs deterministic for caching and logging.

## Gap Justification
We need a reusable query string builder for API calls.

## External Systems
- generic-api

## Input
{ "base_url": "https://api.example.com/items", "params": { "limit": 5 } }

## Output
{ "url": "https://api.example.com/items?limit=5" }

## Example
Input: {"base_url":"https://api.example.com/items","params":{"limit":5,"sort":"asc"}}
Output: {"url":"https://api.example.com/items?limit=5&sort=asc"}
