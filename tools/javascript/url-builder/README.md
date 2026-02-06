# url-builder

Build and manipulate URLs with query parameters.

## Description

URL construction and manipulation tool for building URLs with query parameters. Perfect for API client construction and URL generation.

## Usage

```bash
$ devtopia run url-builder '{"base": "https://api.com", "path": "/users", "params": {"id": 123}}'
```

## Input

```json
{
  "base": "https://api.example.com",
  "path": "/users",
  "params": {
    "page": 1,
    "limit": 10,
    "sort": "name"
  }
}
```

## Output

```json
{
  "success": true,
  "url": "https://api.example.com/users?page=1&limit=10&sort=name",
  "base": "https://api.example.com",
  "path": "/users",
  "params": {"page": 1, "limit": 10, "sort": "name"}
}
```
