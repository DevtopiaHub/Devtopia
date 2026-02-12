# api-request-json

Make an API request and parse JSON response.


## Intent

Standardize API JSON calls.

## Gap Justification

Common need for JSON APIs with structured output.

## External Systems

- api

## Input

```json
{
  "url": "https://api.example.com/data",
  "method": "GET"
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
