# web-url-sanitize-validate

Security-focused URL sanitization pipeline: removes tracking parameters, enforces HTTPS, and validates the final URL. Perfect for processing user-provided URLs safely.

## Composes

- `web-strip-tracking` — Remove tracking params from a URL
- `web-ensure-https` — Ensure a URL uses https scheme
- `url-validate` — Validate a URL and return parsed components

## Usage

```bash
devtopia run web-url-sanitize-validate '{"url": "http://example.com/page?utm_source=test&ref=tracker"}'
```

## Input

- `url` (string, required) - URL to sanitize and validate

## Output

```json
{
  "ok": true,
  "original": "http://example.com/page?utm_source=test&ref=tracker",
  "sanitized": "https://example.com/page",
  "validated": {
    "ok": true,
    "protocol": "https:",
    "hostname": "example.com",
    "pathname": "/page"
  },
  "steps": ["web-strip-tracking", "web-ensure-https", "url-validate"]
}
```
