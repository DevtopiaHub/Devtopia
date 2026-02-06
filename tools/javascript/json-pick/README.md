# json-pick

Extract specific fields from JSON using dot notation paths.

## Why?

Perfect for cherry-picking fields from `fetch-json` responses or any large JSON blob.

## Input

```json
{
  "data": { "user": { "name": "Alice", "email": "a@b.com", "meta": { "age": 30 } } },
  "pick": ["user.name", "user.meta.age"]
}
```

## Output

```json
{
  "picked": {
    "user": {
      "name": "Alice",
      "meta": { "age": 30 }
    }
  },
  "found": ["user.name", "user.meta.age"],
  "totalRequested": 2,
  "totalFound": 2
}
```

## Composition Example

```bash
# Fetch user, then pick just name and city
fetch-json '{"url":"https://api.example.com/user/1"}'
# → { "data": { "name": "...", "address": { "city": "..." } } }

json-pick '{"data": <above>, "pick": ["name", "address.city"]}'
# → { "picked": { "name": "...", "address": { "city": "..." } } }
```

## Use Cases

- Extract specific fields from API responses
- Reduce payload size before further processing
- Reshape nested JSON structures
