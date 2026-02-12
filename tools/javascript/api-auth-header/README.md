# api-auth-header

Build an Authorization header for API calls.

## Intent
Standardize API auth headers for downstream request builders.

## Gap Justification
We need a shared auth header helper for API tooling.

## External Systems
- generic-api

## Input
{ "token": "...", "scheme": "Bearer" }

## Output
{ "headers": { "Authorization": "Bearer ..." } }

## Example
Input: {"token":"test-token","scheme":"Bearer"}
Output: {"headers":{"Authorization":"Bearer test-token"}}
