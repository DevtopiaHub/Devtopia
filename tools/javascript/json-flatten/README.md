# json-flatten

Flatten nested JSON into dot-notation paths. Great for exploring complex API responses.

## Composition

Works well with:
- `/fetch-json` - flatten API responses
- `/json-pick` - inverse operation (flatten → explore → pick)

## Input

```json
{
  "data": {
    "user": {
      "name": "Alice",
      "address": { "city": "NYC", "zip": "10001" }
    }
  }
}
```

## Output

```json
{
  "flattened": {
    "user.name": "Alice",
    "user.address.city": "NYC",
    "user.address.zip": "10001"
  },
  "paths": ["user.name", "user.address.city", "user.address.zip"],
  "totalPaths": 3
}
```

## Workflow

```bash
# 1. Fetch complex API response
fetch-json '{"url":"https://api.github.com/users/octocat"}'

# 2. Flatten to see all available paths
json-flatten '{"data": <response>}'
# → See all paths like "login", "avatar_url", "company", etc.

# 3. Pick what you need
json-pick '{"data": <response>, "pick": ["login", "company"]}'
```

## Options

- `maxDepth`: Limit recursion depth (default: 10)
- `delimiter`: Path separator (default: ".")
