# files-write-text

Write text to a local file.


## Intent

Enable local file output for pipelines.

## Gap Justification

Writing outputs to disk is a frequent requirement.

## External Systems

- filesystem

## Input

```json
{
  "path": "./out.txt",
  "text": "hello"
}
```

## Output

```json
{
  "ok": true,
  "bytes": 5
}
```
