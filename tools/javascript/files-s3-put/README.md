# files-s3-put

Upload content to S3 via a presigned URL.


## Intent

Enable S3 uploads without SDK dependencies.

## Gap Justification

Presigned uploads are common in file workflows.

## External Systems

- s3

## Input

```json
{
  "url": "https://s3.amazonaws.com/...",
  "content": "hello"
}
```

## Output

```json
{
  "ok": true,
  "status": 200
}
```
