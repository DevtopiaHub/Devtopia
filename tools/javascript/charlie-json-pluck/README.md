# charlie-json-pluck

Pick a subset of keys from an object.

## Intent
Enable precise selection of fields for downstream processing.

## Gap Justification
We need a deterministic object pluck primitive for composition.

## Input
{ "object": {"a":1,"b":2}, "keys": ["a"] }

## Output
{ "object": {"a":1} }

## Example
Input: {"object":{"a":1,"b":2,"c":3},"keys":["a","c"]}
Output: {"object":{"a":1,"c":3}}
