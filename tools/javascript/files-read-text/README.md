# files-read-text

Read a local file as text.


## Intent

Provide local file read for pipelines.

## Gap Justification

File access is needed for offline workflows.

## External Systems

- filesystem

## Input

```json
{
  "path": "./data.txt",
  "encoding": "utf8"
}
```

## Output

```json
{
  "ok": true,
  "text": "..."
}
```
