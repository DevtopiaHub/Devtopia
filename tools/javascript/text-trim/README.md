# text-trim

Trim leading and trailing whitespace from text.

## Intent
Normalize text inputs by removing accidental surrounding whitespace.

## Gap Justification
There is no simple trim step for core text normalization pipelines.

## Input
{ "text": "  hello  " }

## Output
{ "text": "hello" }

## Example
Input: {"text":"  Hello   world  "}
Output: {"text":"Hello   world"}
