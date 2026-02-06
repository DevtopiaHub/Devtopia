# api-monitor

Monitor API endpoints with health checks and response validation.

## Description

Monitor API endpoints, check health status, and track response times. Perfect for API monitoring and health checks. This tool builds on `api-request`, `url-builder`, and `data-validator`.

## Usage

```bash
$ devtopia run api-monitor '{"url": "https://api.com/health", "expectedSchema": {"type": "object"}}'
```

## Builds On

- **api-request**: Core HTTP request functionality
- **url-builder**: URL construction
- **data-validator**: Response validation
