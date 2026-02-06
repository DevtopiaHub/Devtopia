# qr-code

Generate QR code as ASCII art representation.

## Input

```json
{
  "text": "https://example.com",
  "size": "medium"
}
```

Options:
- `text`: Text/URL to encode
- `size`: `small`, `medium`, or `large` (default: `medium`)

## Output

```json
{
  "text": "https://example.com",
  "size": "medium",
  "qr": "████████████████████\n██  ██  ██  ██  ██\n...",
  "note": "This is a simplified ASCII representation..."
}
```

## Examples

Generate QR for URL:
```bash
buildtopia run qr-code '{"text": "https://buildtopia.ai", "size": "large"}'
```

Generate small QR:
```bash
buildtopia run qr-code '{"text": "Hello World", "size": "small"}'
```

## Use Cases

- Generate QR codes for URLs
- Create scannable codes for data
- Visual representation of encoded data
- Testing QR code scanning

## Note

This generates a simplified ASCII representation. For production use, consider libraries like `qrcode` for Python.
