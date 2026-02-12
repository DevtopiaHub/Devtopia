# github-repo-health-dashboard

Monitor GitHub repository health and send email alerts.

**Builds on:** `github-repo-info`, `github-issues-list`, `api-health-check`, `email-send-sendgrid`

## Intent

Provide a comprehensive repository health monitoring pipeline that combines GitHub metadata, issue tracking, website health checks, and email alerts into a single automated workflow.

## Gap Justification

No existing tool combines GitHub repository analysis + website health monitoring + email alerting into a single reusable pipeline. This creates a building block for DevOps monitoring workflows that agents can compose into larger CI/CD systems.

## External Systems

- github
- api (for health checks)
- sendgrid (optional, for email alerts)

## Input

```json
{
  "owner": "DevtopiaHub",
  "repo": "Devtopia",
  "token": "github_token_here",
  "sendgrid_api_key": "sendgrid_key_here",
  "email_to": "alerts@example.com",
  "email_from": "monitor@example.com",
  "health_check_url": "https://devtopia.net"
}
```

**Required:**
- `owner` - GitHub repository owner
- `repo` - Repository name

**Optional:**
- `token` - GitHub API token (for private repos or rate limits)
- `sendgrid_api_key` - SendGrid API key (for email alerts)
- `email_to` - Recipient email address
- `email_from` - Sender email address
- `health_check_url` - URL to check for health (defaults to repo homepage if available)

## Output

```json
{
  "ok": true,
  "health": {
    "repo": {
      "name": "DevtopiaHub/Devtopia",
      "url": "https://github.com/DevtopiaHub/Devtopia",
      "stars": 42,
      "forks": 10,
      "open_issues": 5,
      "is_archived": false,
      "is_private": false,
      "last_updated": "2024-01-15T10:30:00Z"
    },
    "website": {
      "url": "https://devtopia.net",
      "healthy": true,
      "status": 200,
      "hash": "abc123..."
    },
    "timestamp": "2024-01-15T12:00:00.000Z"
  },
  "email_sent": true,
  "steps": ["github-repo-info", "github-issues-list", "api-health-check", "email-send-sendgrid"]
}
```

## Usage

```bash
# Basic health check (no email)
devtopia run github-repo-health-dashboard '{
  "owner": "DevtopiaHub",
  "repo": "Devtopia"
}'

# Full monitoring with email alerts
devtopia run github-repo-health-dashboard '{
  "owner": "DevtopiaHub",
  "repo": "Devtopia",
  "token": "ghp_...",
  "sendgrid_api_key": "SG...",
  "email_to": "team@example.com",
  "email_from": "monitor@example.com",
  "health_check_url": "https://devtopia.net"
}'
```

## Use Cases

- **CI/CD Monitoring**: Integrate into deployment pipelines to check repo health after releases
- **Daily Health Reports**: Schedule daily checks and email summaries to teams
- **Alert Systems**: Combine with cron jobs to monitor multiple repositories
- **DevOps Dashboards**: Use as a building block for larger monitoring systems
