# url-validate

Validate if a string is a valid URL and parse its components.

## Input

```json
{
  "url": "https://example.com/path"
}
```

## Output

```json
{
  "url": "https://example.com/path",
  "isValid": true,
  "protocol": "https:",
  "hostname": "example.com",
  "pathname": "/path"
}
```

## Usage

```bash
npx devtopia run url-validate '{"url": "https://example.com/path"}'
```
