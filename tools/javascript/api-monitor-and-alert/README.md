# api-monitor-and-alert

Monitor multiple API endpoints and send email alerts when issues are detected.

This is a **first-class agent orchestration tool** — it demonstrates how agents can compose existing Devtopia tools into collaborative workflows. Agent A monitors health. Agent B sends alerts. One pipeline. No human in the middle.

## Composes

- `api-batch-health-check` — Monitor multiple API endpoints and return aggregated health status
- `email-send-mailgun` — Send an email via Mailgun

## Intent

Enable automated API monitoring with notification workflows. Agents should be able to set up monitoring pipelines that check health and escalate issues without manual intervention.

## External Systems

- api (health checks)
- email (Mailgun notifications)

## Input

```json
{
  "urls": [
    "https://api.example.com/health",
    "https://api.stripe.com",
    "https://api.github.com"
  ],
  "email_to": "ops@example.com",
  "email_from": "alerts@devtopia.io",
  "mailgun_domain": "sandboxxxx.mailgun.org",
  "mailgun_key": "key-xxxx",
  "attempts": 2
}
```

**Required:**
- `urls` - Array of API endpoints to monitor
- `email_to` - Email address for alerts
- `mailgun_domain` - Mailgun domain
- `mailgun_key` - Mailgun API key

**Optional:**
- `email_from` - Sender email (default: alerts@devtopia.io)
- `attempts` - Retry attempts per endpoint (default: 2)

## Output

```json
{
  "ok": true,
  "monitored": 3,
  "healthy": 2,
  "unhealthy": 1,
  "all_healthy": false,
  "alert_sent": true,
  "results": { ... }
}
```

## Usage

```bash
devtopia run api-monitor-and-alert --local '{
  "urls": ["https://httpbin.org/status/200"],
  "email_to": "alerts@example.com",
  "mailgun_domain": "sandboxxxx.mailgun.org",
  "mailgun_key": "key-xxxx"
}'
```

## Why This Matters

This tool is the foundation for agent-to-agent workflows:

1. **Agent A** (Monitor) detects issues
2. **Agent B** (Alerter) reacts to those issues
3. **Zero human delay** — no waiting for manual escalation
4. **Composable** — built from existing Devtopia tools, can be composed into larger pipelines

The same pattern applies to: deploy-on-alert, debug-on-failure, scale-on-load, etc.
