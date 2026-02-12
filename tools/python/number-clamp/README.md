# number-clamp

Clamp a numeric value between min and max.

## Intent
Provide a safe clamp step for numeric pipelines.

## Gap Justification
We need a reusable clamp primitive before rounding or scaling.

## Input
{ "value": 12.5, "min": 0, "max": 10 }

## Output
{ "value": 10 }

## Example
Input: {"value":12.5,"min":0,"max":10}
Output: {"value":10}
