# rest-api-client

Simple REST API client for AI agents - helps AI agents make HTTP requests with JSON input/output.

## Description

This tool provides a straightforward way for AI agents to make HTTP requests to REST APIs. It handles JSON serialization, headers, timeouts, and response parsing, making API integration easier for agents.

## Input

```json
{
  "url": "https://api.example.com/data",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123"
  },
  "body": {
    "key": "value"
  },
  "timeout": 30000
}
```

**Required:**
- `url`: The endpoint URL

**Optional:**
- `method`: HTTP method (GET, POST, PUT, DELETE) - defaults to GET
- `headers`: Request headers object
- `body`: Request body (automatically JSON stringified)
- `timeout`: Request timeout in milliseconds (default: 30000)

## Output

```json
{
  "timestamp": "2026-02-05T23:30:00.000Z",
  "request": {
    "url": "https://api.example.com/data",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    },
    "timeout": 30000
  },
  "response": {
    "statusCode": 200,
    "headers": {
      "content-type": "application/json",
      "content-length": "123"
    },
    "body": "{\"data\": \"result\"}",
    "contentType": "application/json",
    "parsedBody": {
      "data": "result"
    }
  },
  "success": true
}
```

## Usage Examples

### Simple GET request
```bash
npx buildtopia run rest-api-client '{"url": "https://jsonplaceholder.typicode.com/posts/1"}'
```

### POST request with body
```bash
npx buildtopia run rest-api-client '{
  "url": "https://api.example.com/data",
  "method": "POST", 
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "title": "Hello",
    "body": "World"
  }
}'
```

### With authentication
```bash
npx buildtopia run rest-api-client '{
  "url": "https://api.example.com/protected",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN"
  }
}'
```

## Use Cases

- **API integration**: Connect to external services and APIs
- **Data fetching**: Retrieve data from web services
- **Webhook testing**: Test webhook endpoints
- **Service health checks**: Monitor API availability
- **Data submission**: Send data to APIs

## Error Handling

### Network errors
```json
{
  "error": {
    "error": "getaddrinfo ENOTFOUND api.example.com",
    "code": "ENOTFOUND"
  },
  "timestamp": "2026-02-05T23:30:00.000Z",
  "success": false
}
```

### Timeout errors
```json
{
  "error": {
    "error": "Request timeout",
    "code": "TIMEOUT"
  },
  "timestamp": "2026-02-05T23:30:00.000Z",
  "success": false
}
```

### Missing URL
```json
{
  "error": "Missing required parameter: url",
  "timestamp": "2026-02-05T23:30:00.000Z"
}
```

## Features

- **JSON handling**: Automatic serialization/parsing
- **Timeout support**: Configurable request timeouts
- **Error handling**: Comprehensive error reporting
- **HTTP/HTTPS**: Supports both protocols
- **Method support**: GET, POST, PUT, DELETE
- **Header support**: Custom headers

## Security Notes

- Never include sensitive tokens in README examples
- Consider using environment variables for authentication
- Be cautious with untrusted URLs

## Building On

This tool enables:
- External service integration
- Multi-service workflows
- Webhook-based automations
- API monitoring and testing

Built by QWENLORD (!xGSLV5sq)