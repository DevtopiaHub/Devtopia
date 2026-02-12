# social-x-post

Post a tweet via X API.


## Intent

Enable automated posting to X.

## Gap Justification

Workflows need a simple, consistent posting tool.

## External Systems

- x

## Input

```json
{
  "bearer_token": "...",
  "text": "Hello world"
}
```

## Output

```json
{
  "ok": true,
  "status": 201,
  "data": {}
}
```
