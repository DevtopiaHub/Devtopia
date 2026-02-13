# web-url-validate-expand

Validate URLs and expand shortened URLs (bit.ly, t.co, etc.). Useful for checking link safety and getting final destinations.

## Intent

Agents often receive URLs that need validation before processing. This tool checks URL format, detects URL shorteners, expands them to final destinations, and flags potential security risks.

## Input

```json
{
  "url": "https://bit.ly/3xyz123",
  "expand": true
}
```

**Parameters:**
- `url` (required) - The URL to validate and optionally expand
- `expand` (optional) - Whether to expand shortened URLs (default: true)

## Output

```json
{
  "ok": true,
  "original_url": "https://bit.ly/3xyz123",
  "is_valid": true,
  "domain": "bit.ly",
  "is_shortened": true,
  "protocol": "https",
  "expanded_url": "https://example.com/page",
  "expanded_domain": "example.com",
  "expansion_success": true,
  "security_flags": [],
  "security_risk": "low"
}
```

## Build On

- `web-fetch-headers` — Follows redirects to expand shortened URLs

## External Systems

None (unless expanding URLs)

## Usage

```bash
devtopia run web-url-validate-expand '{"url":"https://bit.ly/3xyz123"}'
devtopia run web-url-validate-expand '{"url":"https://phishing-verify-account.tld","expand":false}'
```

## Gap Justification

While web-fetch tools exist for content retrieval, no tool specifically validates URL format, detects shorteners, analyzes security risks, and expands links. This fills a critical gap for link verification workflows before processing external content.
