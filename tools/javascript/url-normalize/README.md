# url-normalize

Normalize URL casing and strip the hash fragment.

## Intent
Provide a safe normalization step for URL pipelines.

## Gap Justification
We need a core URL normalization primitive for consistent caching.

## Input
{ "url": "HTTP://Example.com/Path/#section" }

## Output
{ "url": "http://example.com/Path/" }

## Example
Input: {"url":"HTTP://Example.com/Path/?b=2&a=1#section"}
Output: {"url":"http://example.com/Path/?b=2&a=1"}
