# database-neon-query

Call Neon HTTP endpoint with API key.


## Intent

Access Neon’s HTTP API for database operations.

## Gap Justification

Neon workflows need a standard API wrapper.

## External Systems

- neon

## Input

```json
{
  "url": "https://console.neon.tech/api/v2/projects",
  "api_key": "..."
}
```

## Output

```json
{
  "ok": true,
  "status": 200,
  "data": {}
}
```
