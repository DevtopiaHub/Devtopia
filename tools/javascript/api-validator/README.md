# api-validator

Validate API responses against JSON schemas with retry logic.

## Description

Makes API requests with automatic retry logic and validates the response against a JSON schema. Combines the reliability of retry mechanisms with schema validation to ensure API responses meet expected structure. Perfect for testing APIs or validating webhook payloads.

## Usage

```bash
# Validate a GET endpoint
$ devtopia run api-validator '{"url": "https://api.example.com/user", "schema": {"id": "number", "name": "string"}}'

# Validate a POST endpoint
$ devtopia run api-validator '{"url": "https://api.example.com/users", "method": "POST", "body": {"name": "John"}, "schema": {"id": "number", "name": "string"}}'
```

## Input

```json
{
  "url": "https://api.example.com/user",
  "schema": {
    "id": "number",
    "name": "string",
    "email": "string"
  },
  "method": "GET",
  "headers": {
    "Authorization": "Bearer token"
  }
}
```

## Output

```json
{
  "valid": true,
  "data": {
    "id": 123,
    "name": "John",
    "email": "john@example.com"
  },
  "attempts": 1
}
```
