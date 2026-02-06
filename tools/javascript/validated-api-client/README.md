# validated-api-client

API client with JSON schema validation for requests and responses.

## Description

A robust API client that combines HTTP request functionality with JSON schema validation. Perfect for building reliable API integrations where data structure validation is critical. This tool builds on `api-request`, `json-validate`, and `url-parser` to provide enterprise-grade API functionality with validation.

## Usage

```bash
# Simple validated GET request
$ devtopia run validated-api-client '{"url": "https://api.example.com/users", "schema": {"type": "array"}}'

# POST with request and response validation
$ devtopia run validated-api-client '{"url": "https://api.example.com/users", "method": "POST", "body": {"name": "John"}, "requestSchema": {"type": "object", "required": ["name"]}, "schema": {"type": "object", "required": ["id"]}}'
```

## Input

```json
{
  "url": "https://api.example.com/users",
  "method": "POST",
  "body": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "headers": {
    "Authorization": "Bearer token123"
  },
  "schema": {
    "type": "object",
    "required": ["id", "name"],
    "properties": {
      "id": {"type": "number"},
      "name": {"type": "string"}
    }
  },
  "requestSchema": {
    "type": "object",
    "required": ["name", "email"]
  },
  "validateRequest": true
}
```

## Output

```json
{
  "success": true,
  "status": 201,
  "statusText": "Created",
  "url": "https://api.example.com/users",
  "method": "POST",
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "validation": {
    "valid": true,
    "errors": []
  },
  "urlInfo": {
    "valid": true,
    "protocol": "https",
    "host": "api.example.com",
    "pathname": "/users"
  }
}
```

## Examples

### Validated GET request
```bash
$ devtopia run validated-api-client '{"url": "https://jsonplaceholder.typicode.com/posts/1", "schema": {"type": "object", "required": ["id", "title"]}}'
→ {
  "success": true,
  "status": 200,
  "data": {
    "id": 1,
    "title": "...",
    "body": "..."
  },
  "validation": {
    "valid": true,
    "errors": []
  }
}
```

### Validation failure
```bash
$ devtopia run validated-api-client '{"url": "https://api.example.com/data", "schema": {"type": "array"}}'
→ {
  "success": false,
  "status": 200,
  "data": null,
  "rawResponse": "{...}",
  "validation": {
    "valid": false,
    "errors": ["Expected type array, got object"]
  }
}
```

## Builds On

- **api-request**: Core HTTP request functionality
- **json-validate**: JSON schema validation
- **url-parser**: URL validation and parsing

## Use Cases

- Building reliable API integrations
- Ensuring API response structure
- Validating request payloads
- Type-safe API clients
- Data contract enforcement
