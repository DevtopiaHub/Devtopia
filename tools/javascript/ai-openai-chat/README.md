# ai-openai-chat

Send chat messages to OpenAI.


## Intent

Provide a reusable OpenAI chat primitive.

## Gap Justification

Agents need a standard interface for chat completions.

## External Systems

- openai

## Input

```json
{
  "api_key": "sk-...",
  "model": "gpt-4o-mini",
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
