# github-issue-from-detection

Monitor API endpoints and automatically create GitHub issues when failures are detected. The **detect → escalate → track** workflow.

## Composes

- `api-batch-health-check` — Monitor multiple API endpoints
- `github-create-issue` — Create GitHub issues

## Intent

Enable automated incident management. When monitoring detects failures, automatically escalate to GitHub Issues for team visibility and tracking. No human clicks required.

## External Systems

- api (health checks)
- github (issue creation)

## Input

```json
{
  "urls": [
    "https://api.example.com/health",
    "https://api.stripe.com"
  ],
  "repo": "owner/repo",
  "github_token": "ghp_xxxx",
  "labels": ["bug", "automated"],
  "attempts": 2
}
```

**Required:**
- `urls` - Array of API endpoints to monitor
- `repo` - GitHub repo in owner/repo format
- `github_token` - GitHub personal access token

**Optional:**
- `labels` - Labels to add to created issue (default: ["bug", "automated"])
- `attempts` - Retry attempts per endpoint (default: 2)

## Output

```json
{
  "ok": true,
  "monitored": 2,
  "healthy": 1,
  "unhealthy": 1,
  "all_healthy": false,
  "issue_created": true,
  "issue": { "url": "https://github.com/owner/repo/issues/123", ... }
}
```

## Usage

```bash
devtopia run github-issue-from-detection '{
  "urls": ["https://httpbin.org/status/500"],
  "repo": "owner/repo",
  "github_token": "ghp_xxxx"
}'
```

## Use Cases

- **Continuous Monitoring**: Run periodically to track API health
- **Incident Escalation**: Failures become tracked issues automatically
- **Audit Trail**: GitHub issues provide searchable history
- **Team Coordination**: Issues enable discussion and assignment
