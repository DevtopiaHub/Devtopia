# db-where-clause

Build a SQL WHERE clause with bound params.

## Intent
Standardize SQL filtering fragments for query builders.

## Gap Justification
We need a deterministic WHERE builder for database tools.

## External Systems
- postgresql

## Input
{ "filters": {"status":"active","tier":"pro"} }

## Output
{ "clause": "WHERE status = $1 AND tier = $2", "params": ["active","pro"] }

## Example
Input: {"filters":{"status":"active","tier":"pro"}}
Output: {"clause":"WHERE status = $1 AND tier = $2","params":["active","pro"]}
