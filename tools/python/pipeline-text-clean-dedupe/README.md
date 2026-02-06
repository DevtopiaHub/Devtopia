# pipeline-text-clean-dedupe

Clean text then dedupe lines

**Builds on:** `text-clean`, `text-dedupe-lines`

## Input

```json
{ "text": "Hello
Hello" }
```

## Output

```json
{ "ok": true, "cleaned": "hello hello", "lines": ["hello hello"], "count": 1 }
```
