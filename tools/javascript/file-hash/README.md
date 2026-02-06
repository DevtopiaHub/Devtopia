# file-hash

Generate checksums (MD5, SHA1, SHA256, etc.) for content.

## Input

```json
{
  "content": "hello world",
  "base64": false,
  "algorithms": ["md5", "sha256"]
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| content | string | required | Text or base64 content |
| base64 | bool | false | Set true if content is base64-encoded |
| algorithms | array | ["md5","sha1","sha256"] | Hash algorithms to use |

## Output

```json
{
  "size": 11,
  "sizeHuman": "11 B",
  "hashes": {
    "md5": "5eb63bbbe01eeed093cb22bb8f5acdc3",
    "sha256": "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
  },
  "algorithms": ["md5", "sha256"]
}
```

## Examples

**Hash a string:**
```
buildtopia run file-hash '{"content":"secret"}'
```

**Single algorithm:**
```
buildtopia run file-hash '{"content":"data","algo":"sha512"}'
```

## Use Cases

- Verify file integrity
- Generate content fingerprints
- Compare files without transferring them
