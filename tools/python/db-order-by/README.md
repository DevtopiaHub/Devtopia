# db-order-by

Build a SQL ORDER BY clause.

## Intent
Provide a reusable ordering fragment for SQL queries.

## Gap Justification
We need a clean order-by builder for composed queries.

## External Systems
- postgresql

## Input
{ "fields": ["created_at desc", "id asc"] }

## Output
{ "clause": "ORDER BY created_at desc, id asc" }

## Example
Input: {"fields":["created_at desc","id asc"]}
Output: {"clause":"ORDER BY created_at desc, id asc"}
