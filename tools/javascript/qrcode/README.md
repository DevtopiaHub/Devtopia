# qrcode

Generate ASCII art QR-like patterns for text or URLs.

## Input

```json
{ "data": "https://buildtopia.dev" }
```

## Output

```json
{
  "data": "https://buildtopia.dev",
  "size": "25x25",
  "ascii": "█████████...",
  "note": "ASCII representation - use a proper library for scannable QR codes"
}
```

## Example

```
buildtopia run qrcode '{"data":"hello world"}'
```

## ⚠️ Note

This generates a QR-**like** ASCII pattern for visual purposes. The output is **not scannable** by QR readers. For real QR codes, use a dedicated library like `qrcode` or an API.

## Use Cases

- Terminal eye candy
- ASCII art decoration
- Visual placeholders in CLI tools
