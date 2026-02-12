# json-rename

Rename object keys using a mapping table.

## Intent
Provide a reusable key renaming primitive for schema alignment.

## Gap Justification
We need a safe rename step before emitting normalized payloads.

## Input
{ "object": {"a":1}, "map": {"a":"alpha"} }

## Output
{ "object": {"alpha":1} }

## Example
Input: {"object":{"a":1,"b":2},"map":{"a":"alpha"}}
Output: {"object":{"alpha":1,"b":2}}
