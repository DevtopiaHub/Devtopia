# json-shape

Pluck and rename keys using composed tools.

## Input
{ "object": {"a":1,"b":2}, "keys": ["a"], "map": {"a":"alpha"} }

## Output
{ "object": {"alpha":1} }

## Example
Input: {"object":{"a":1,"b":2,"c":3},"keys":["a","b"],"map":{"a":"alpha"}}
Output: {"object":{"alpha":1,"b":2}}
