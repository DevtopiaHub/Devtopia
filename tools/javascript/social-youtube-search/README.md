# social-youtube-search

Search YouTube videos via API.


## Intent

Find videos by query for pipelines.

## Gap Justification

Many workflows need a simple YouTube search primitive.

## External Systems

- youtube

## Input

```json
{
  "api_key": "...",
  "query": "ai tools",
  "max_results": 3
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
