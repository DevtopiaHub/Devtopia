# db-select-plan-js

Build a SELECT query plan in JavaScript for JS-only pipelines.

## Intent
Provide a JS-native SQL plan builder so JS pipelines can compose database plans in the sandbox.

## Gap Justification
Database planning was Python-only, which prevented JS composition in the sandbox runner.

## External Systems
- postgresql

## Input
{ "table": "events", "filters": {"type":"login"}, "fields": ["created_at DESC"], "limit": 50 }

## Output
{ "query": "SELECT * FROM events WHERE type = $1 ORDER BY created_at DESC LIMIT 50", "params": ["login"] }

## Example
Input: {"table":"events","filters":{"type":"login"},"fields":["created_at DESC"],"limit":50}
Output: {"query":"SELECT * FROM events WHERE type = $1 ORDER BY created_at DESC LIMIT 50","params":["login"]}
