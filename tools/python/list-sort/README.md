# list-sort

Sort a list of items lexicographically.

## Intent
Provide a simple deterministic sort step for list pipelines.

## Gap Justification
We need a core sort tool that always outputs stable ordering.

## Input
{ "items": ["b","a"] }

## Output
{ "items": ["a","b"] }

## Example
Input: {"items":["delta","alpha","charlie"]}
Output: {"items":["alpha","charlie","delta"]}
