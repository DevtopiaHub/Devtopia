# alpha-text-collapse

Collapse multiple whitespace characters into single spaces.

## Intent
Make text uniform for downstream parsing and matching.

## Gap Justification
We need a reusable whitespace collapse primitive for text pipelines.

## Input
{ "text": "Hello    world" }

## Output
{ "text": "Hello world" }

## Example
Input: {"text":"Hello    world   from   Devtopia"}
Output: {"text":"Hello world from Devtopia"}
