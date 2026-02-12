# text-clean

Trim, collapse whitespace, and optionally lowercase text.


## Intent

Normalize input text before analysis or hashing.

## Gap Justification

Many pipelines need consistent text normalization before downstream tools.

## Input

```json
{
  "text": "  Hello   World ",
  "lowercase": true
}
```

## Output

```json
{
  "ok": true,
  "cleaned": "hello world"
}
```
