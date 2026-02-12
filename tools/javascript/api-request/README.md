# api-request

Make a generic API request and return raw text.


## Intent

Provide a universal API request primitive.

## Gap Justification

Needed as the base for many composed API workflows.

## External Systems

- api

## Input

```json
{
  "url": "https://api.example.com",
  "method": "GET"
}
```

## Output

```json
{
  "ok": true,
  "status": 200,
  "text": "..."
}
```
