# web-fetch-json

Fetch URL and parse JSON response.


## Intent

Retrieve structured JSON from web endpoints.

## Gap Justification

A reliable JSON fetch primitive for API chains.

## External Systems

- http

## Input

```json
{
  "url": "https://example.com/data.json"
}
```

## Output

```json
{
  "ok": true,
  "status": 200,
  "data": {
    "value": 1
  }
}
```
