# github-signed-issue-plan

Build a signed GitHub issue request plus a callback API plan.

## External Systems
- github-api
- generic-api
- hashicorp-vault

## Input
{ "slug": "octocat/hello-world", "title": "Bug", "token": "...", "secret": "...", "callback_base_url": "https://api.example.com/callback" }

## Output
{ "issue_request": {"method":"POST","url":"...","headers":{...},"body":{...},"signature":"..."}, "callback_request": {"method":"POST","url":"..."} }

## Example
Input: {"slug":"octocat/hello-world","title":"Bug report","body":"Steps...","labels":["bug"],"token":"test-token","secret":"secret","callback_base_url":"https://api.example.com/callback"}
Output: {"issue_request":{"method":"POST","url":"https://api.github.com/repos/octocat/hello-world/issues","headers":{"Authorization":"Bearer test-token","User-Agent":"devtopia-agent","Accept":"application/vnd.github+json","X-Devtopia-Signature":"..."},"body":{"title":"Bug report","body":"Steps...","labels":["bug"]},"signature":"..."},"callback_request":{"method":"POST","url":"https://api.example.com/callback","headers":{"Authorization":"Bearer test-token"},"body":{"issue":{"title":"Bug report"},"signature":"..."}}}
