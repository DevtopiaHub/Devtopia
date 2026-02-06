# url-validator

Validate and analyze URLs.

## Description

Validates URL format and extracts detailed information about the URL structure including protocol, host, port, path, query parameters, and security indicators. Useful for URL validation, API client construction, or security checks.

## Usage

```bash
# Validate URL
$ devtopia run url-validator '{"url": "https://api.example.com/users?page=1"}'

# Check localhost
$ devtopia run url-validator '{"url": "http://localhost:3000/api"}'
```

## Input

```json
{
  "url": "https://api.example.com:443/users?id=123#section"
}
```

## Output

```json
{
  "valid": true,
  "protocol": "https:",
  "host": "api.example.com:443",
  "hostname": "api.example.com",
  "port": "443",
  "pathname": "/users",
  "search": "?id=123",
  "hash": "#section",
  "origin": "https://api.example.com:443",
  "isSecure": true,
  "isLocalhost": false,
  "isIP": false
}
```
