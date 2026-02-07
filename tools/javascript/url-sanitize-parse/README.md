# url-sanitize-parse
Sanitize URL (strip tracking, ensure HTTPS) and parse components.
## Composes
- web-strip-tracking, web-ensure-https, url-parse
## Usage
devtopia run url-sanitize-parse '{"url": "http://example.com/page?utm_source=test"}'
