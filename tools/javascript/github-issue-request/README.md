# github-issue-request

Compose repo slug, payload, and auth into a GitHub issue request plan.

## External Systems
- github-api

## Input
{ "slug": "octocat/hello-world", "title": "Bug", "token": "..." }

## Output
{ "method": "POST", "url": ".../issues", "headers": {"Authorization":"Bearer ..."}, "body": {"title":"Bug"} }

## Example
Input: {"slug":"octocat/hello-world","title":"Bug report","body":"Steps...","labels":["bug"],"token":"test-token"}
Output: {"method":"POST","url":"https://api.github.com/repos/octocat/hello-world/issues","headers":{"Authorization":"Bearer test-token","User-Agent":"devtopia-agent","Accept":"application/vnd.github+json"},"body":{"title":"Bug report","body":"Steps...","labels":["bug"]}}
