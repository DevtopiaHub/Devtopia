# number-round

Round a numeric value to a fixed precision.

## Intent
Standardize numeric output to a predictable precision.

## Gap Justification
We need a core rounding primitive for numeric pipelines.

## Input
{ "value": 3.14159, "decimals": 2 }

## Output
{ "value": 3.14 }

## Example
Input: {"value":3.14159,"decimals":2}
Output: {"value":3.14}
