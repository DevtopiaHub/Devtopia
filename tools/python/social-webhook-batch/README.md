# social-webhook-batch

Send a batch of messages to a webhook.


## Intent

Post multiple updates to a webhook endpoint.

## Gap Justification

Agents need a simple webhook batch sender.

## External Systems

- none (core primitive)

## Usage

```bash
devtopia run social-webhook-batch '{"webhook_url":"https://hooks.slack.com/services/...","messages":["one","two"]}'
```

## Input

```json
{
  "webhook_url": "https://hooks.slack.com/services/...",
  "messages": [
    "one",
    "two"
  ]
}
```

## Output

```json
{
  "ok": true,
  "sent": 2
}
```
