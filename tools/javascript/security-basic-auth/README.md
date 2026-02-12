# security-basic-auth

Generate a Basic Auth header.


## Intent

Create Authorization header for basic auth.

## Gap Justification

Many API flows require basic auth; this standardizes output.

## External Systems

- auth

## Input

```json
{
  "username": "user",
  "password": "pass"
}
```

## Output

```json
{
  "ok": true,
  "header": "Basic dXNlcjpwYXNz"
}
```
