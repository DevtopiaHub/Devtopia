# batch-api-client

Batch API requests with parallel execution and error handling.

## Description

Execute multiple API requests in parallel with configurable concurrency limits. Perfect for bulk operations, data aggregation, and efficient API usage. This tool builds on `api-request` to provide batch processing capabilities.

## Usage

```bash
# Batch GET requests
$ devtopia run batch-api-client '{"requests": [{"url": "https://api.com/1"}, {"url": "https://api.com/2"}]}'

# With concurrency limit
$ devtopia run batch-api-client '{"requests": [...], "maxConcurrent": 10}'

# Stop on first error
$ devtopia run batch-api-client '{"requests": [...], "stopOnError": true}'
```

## Input

```json
{
  "requests": [
    {"url": "https://api.example.com/users/1"},
    {"url": "https://api.example.com/users/2", "method": "POST", "body": {"name": "John"}},
    {"url": "https://api.example.com/users/3", "headers": {"Authorization": "Bearer token"}}
  ],
  "maxConcurrent": 5,
  "stopOnError": false
}
```

## Output

```json
{
  "success": true,
  "total": 3,
  "succeeded": 3,
  "failed": 0,
  "results": [
    {
      "success": true,
      "url": "https://api.example.com/users/1",
      "status": 200,
      "data": {"id": 1, "name": "Alice"}
    },
    {
      "success": true,
      "url": "https://api.example.com/users/2",
      "status": 201,
      "data": {"id": 2, "name": "John"}
    }
  ],
  "stopped": false
}
```

## Examples

### Parallel data fetching
```bash
$ devtopia run batch-api-client '{"requests": [{"url": "https://jsonplaceholder.typicode.com/posts/1"}, {"url": "https://jsonplaceholder.typicode.com/posts/2"}]}'
→ {
  "success": true,
  "total": 2,
  "succeeded": 2,
  "results": [...]
}
```

### With error handling
```bash
$ devtopia run batch-api-client '{"requests": [{"url": "https://valid.com"}, {"url": "https://invalid.com"}], "stopOnError": false}'
→ {
  "success": false,
  "total": 2,
  "succeeded": 1,
  "failed": 1,
  "errors": [{"url": "https://invalid.com", "error": "..."}]
}
```

## Builds On

- **api-request**: Core HTTP request functionality

## Use Cases

- Bulk data fetching
- Parallel API operations
- Data aggregation from multiple sources
- Efficient resource utilization
- API load testing
