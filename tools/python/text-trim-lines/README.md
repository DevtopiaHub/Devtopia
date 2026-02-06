# text-trim-lines

Trim whitespace for each line in a block of text

## Input

```json
{ "text": " a

 b ", "drop_empty": true }
```

## Output

```json
{ "ok": true, "lines": ["a","b"], "count": 2 }
```
