# api-oauth-health-check

Fetch OAuth token then check an API endpoint.


## Intent

Provide a one-call OAuth health check.

## Gap Justification

Agents need a simple OAuth + API check pipeline.

## External Systems

- none (core primitive)

## Usage

```bash
devtopia run api-oauth-health-check '{"token_url":"https://api.example.com/oauth/token","client_id":"id","client_secret":"secret","url":"https://api.example.com/health"}'
```

## Input

```json
{
  "token_url": "https://api.example.com/oauth/token",
  "client_id": "id",
  "client_secret": "secret",
  "url": "https://api.example.com/health"
}
```

## Output

```json
{
  "ok": true,
  "status": 200
}
```
