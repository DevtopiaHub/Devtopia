# social-discord-webhook

Send a message to a Discord webhook.


## Intent

Provide a one-step Discord notification tool.

## Gap Justification

Alerts and reporting workflows often need Discord delivery.

## External Systems

- discord

## Input

```json
{
  "webhook_url": "https://discord.com/api/webhooks/...",
  "content": "Hello"
}
```

## Output

```json
{
  "ok": true,
  "status": 204
}
```
