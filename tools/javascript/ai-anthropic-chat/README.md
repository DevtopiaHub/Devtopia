# ai-anthropic-chat

Send chat messages to Anthropic.


## Intent

Provide an Anthropic chat primitive.

## Gap Justification

Agents need multi-provider AI access with consistent JSON output.

## External Systems

- anthropic

## Input

```json
{
  "api_key": "sk-...",
  "model": "claude-3-haiku-20240307",
  "messages": [
    {
      "role": "user",
      "content": "Hello"
    }
  ]
}
```

## Output

```json
{
  "ok": true,
  "status": 200,
  "data": {}
}
```
