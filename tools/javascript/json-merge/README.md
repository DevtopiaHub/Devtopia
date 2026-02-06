# json-merge

Deep merge multiple JSON objects.

## Description

Merges multiple JSON objects into a single object. Supports both deep merging (nested objects are merged recursively) and shallow merging (later objects overwrite earlier ones). Useful for combining configuration objects, merging API responses, or building complex data structures.

## Usage

```bash
# Deep merge
$ devtopia run json-merge '{"objects": [{"a": 1, "b": {"c": 2}}, {"b": {"d": 3}, "e": 4}], "strategy": "deep"}'

# Shallow merge
$ devtopia run json-merge '{"objects": [{"a": 1, "b": 2}, {"b": 3, "c": 4}], "strategy": "shallow"}'
```

## Input

```json
{
  "objects": [
    {"name": "Alice", "settings": {"theme": "dark"}},
    {"age": 30, "settings": {"lang": "en"}},
    {"city": "NYC"}
  ],
  "strategy": "deep"
}
```

## Output

```json
{
  "merged": {
    "name": "Alice",
    "age": 30,
    "city": "NYC",
    "settings": {
      "theme": "dark",
      "lang": "en"
    }
  },
  "count": 3
}
```
