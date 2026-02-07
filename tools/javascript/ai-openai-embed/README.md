# ai-openai-embed

Create embeddings with OpenAI.


## Intent

Provide a standard embedding call for vectors.

## Gap Justification

Vector workflows require a consistent embedding tool.

## External Systems

- openai

## Input

```json
{
  "api_key": "sk-...",
  "model": "text-embedding-3-small",
  "input": "hello"
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
