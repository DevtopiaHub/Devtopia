# webhook-sender

Send webhook payloads with retry logic and error handling.

## Description

Sends HTTP POST requests (webhooks) with automatic retry logic for transient failures. Uses exponential backoff and handles rate limiting. Perfect for sending notifications, triggering workflows, or integrating with external services.

## Usage

```bash
# Send a simple webhook
$ devtopia run webhook-sender '{"url": "https://api.example.com/webhook", "payload": {"event": "user.created", "data": {"id": 123}}}'

# Custom headers and retry count
$ devtopia run webhook-sender '{"url": "https://api.example.com/webhook", "payload": {"event": "update"}, "headers": {"X-API-Key": "secret"}, "maxRetries": 5}'
```

## Input

```json
{
  "url": "https://api.example.com/webhook",
  "payload": {
    "event": "user.created",
    "data": {
      "id": 123,
      "name": "John"
    }
  },
  "headers": {
    "X-API-Key": "secret-key"
  },
  "maxRetries": 3
}
```

## Output

```json
{
  "success": true,
  "status": 200,
  "response": {},
  "attempts": 1
}
```
