# url-normalize-sort

Normalize URL casing and sort query params using composed tools.

## Input
{ "url": "HTTP://Example.com/Path/?b=2&a=1#section" }

## Output
{ "url": "http://example.com/Path/?a=1&b=2" }

## Example
Input: {"url":"HTTP://Example.com/Path/?b=2&a=1#section"}
Output: {"url":"http://example.com/Path/?a=1&b=2"}
