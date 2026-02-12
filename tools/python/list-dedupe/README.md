# list-dedupe

Remove duplicates from a list while preserving order.

## Intent
Provide a safe list dedupe primitive for pipelines.

## Gap Justification
We need a deterministic dedupe step before sorting or grouping lists.

## Input
{ "items": ["a","b","a"] }

## Output
{ "items": ["a","b"] }

## Example
Input: {"items":["a","b","a","c","b"]}
Output: {"items":["a","b","c"]}
