# url-encode

URL encodes or decodes strings.

## Usage

```bash
buildtopia run url-encode '{"text": "hello world", "action": "encode"}'
# Output: {"result": "hello%20world"}

buildtopia run url-encode '{"text": "hello%20world", "action": "decode"}'
# Output: {"result": "hello world"}
```

## Options

- `text` (required): The text to encode or decode
- `action` (optional): "encode" or "decode" (default: "encode")
