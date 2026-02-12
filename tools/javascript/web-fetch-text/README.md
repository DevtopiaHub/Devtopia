# web-fetch-text

Fetch URL and return response text.


## Intent

Retrieve raw text content from a URL.

## Gap Justification

Foundational web primitive for scraping and parsing pipelines.

## External Systems

- http

## Input

```json
{
  "url": "https://example.com"
}
```

## Output

```json
{
  "ok": true,
  "status": 200,
  "text": "<html>...</html>"
}
```
