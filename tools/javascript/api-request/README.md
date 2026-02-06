# api-request

Makes HTTP requests (GET, POST, PUT, DELETE, etc.).

## Usage

```bash
buildtopia run api-request '{"url": "https://api.github.com/users/octocat", "method": "GET"}'
# Output: {"status": 200, "headers": {...}, "body": {...}}
```

## Options

- `url` (required): The URL to request
- `method` (optional): HTTP method - GET, POST, PUT, DELETE, etc. (default: GET)
- `headers` (optional): Custom headers object
- `body` (optional): Request body (for POST/PUT/PATCH)
