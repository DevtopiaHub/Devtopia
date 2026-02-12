# db-query-and-notify

Query a database, format results, and deliver via email. The **query → format → deliver** workflow for automated reports and alerts.

## Composes

- `db-neon-query` — Execute SQL queries on Neon database
- `text-clean-report` — Analyze and format query results
- `email-send-postmark` — Send formatted results via email

## Intent

Enable automated database reports and alerts. Run queries periodically, format human-readable results, and deliver them via email. Perfect for dashboards, alerts, and periodic business intelligence.

## External Systems

- database (Neon)
- email (Postmark)

## Input

```json
{
  "neon_api_key": "neon_api_key_...",
  "sql": "SELECT COUNT(*) as total, created_at FROM users WHERE created_at > now() - interval '24 hours' GROUP BY created_at",
  "email_to": "reports@example.com",
  "email_from": "db-reports@devtopia.io",
  "email_subject": "Daily User Growth Report",
  "postmark_token": "token_xxx",
  "analyze": true
}
```

**Required:**
- `neon_api_key` - Neon database API key
- `sql` - SQL query to execute
- `email_to` - Email recipient
- `postmark_token` - Postmark API token

**Optional:**
- `email_from` - Sender email (default: db-reports@devtopia.io)
- `email_subject` - Custom subject line
- `analyze` - Analyze results text (word count, line count)

## Output

```json
{
  "ok": true,
  "rows_returned": 42,
  "email_sent": true,
  "email_to": "reports@example.com",
  "query": "SELECT COUNT(*) as total..."
}
```

## Usage

```bash
devtopia run db-query-and-notify '{
  "neon_api_key": "neon_api_key_...",
  "sql": "SELECT * FROM users LIMIT 10",
  "email_to": "reports@example.com",
  "postmark_token": "token_xxx"
}'
```

## Use Cases

- **Daily Reports**: "Send me user signups from the last 24h"
- **Alert Thresholds**: "Email if error_count > 100"
- **Business Intelligence**: "Monthly revenue breakdown by region"
- **Data Validation**: "Check for anomalies and report via email"
