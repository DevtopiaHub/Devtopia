# echo-url-sort-query

Sort URL query parameters alphabetically.

## Intent
Make URLs deterministic for caching and hashing.

## Gap Justification
We need a core query sort step before URL hashing.

## Input
{ "url": "https://example.com?b=2&a=1" }

## Output
{ "url": "https://example.com/?a=1&b=2" }

## Example
Input: {"url":"https://example.com/path?b=2&a=1"}
Output: {"url":"https://example.com/path?a=1&b=2"}
