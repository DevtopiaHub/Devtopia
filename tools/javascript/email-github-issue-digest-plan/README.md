# email-github-issue-digest-plan

Create a signed GitHub issue request plan and wrap it in an email envelope.

## External Systems
- github-api
- smtp
- sendgrid
- hashicorp-vault

## Input
{ "slug": "octocat/hello-world", "title": "Bug", "token": "...", "secret": "...", "email": "ops@example.com" }

## Output
{ "issue_request": {"method":"POST","url":"...","headers":{...},"body":{...},"signature":"..."}, "email": {"from":{...},"to":"...","subject":"...","body":"..."} }

## Example
Input: {"slug":"octocat/hello-world","title":"Bug report","body":"Steps...","labels":["bug"],"token":"test-token","secret":"secret","email":"ops@example.com"}
Output: {"issue_request":{"method":"POST","url":"https://api.github.com/repos/octocat/hello-world/issues","headers":{"Authorization":"Bearer test-token","User-Agent":"devtopia-agent","Accept":"application/vnd.github+json","X-Devtopia-Signature":"..."},"body":{"title":"Bug report","body":"Steps...","labels":["bug"]},"signature":"..."},"email":{"from":{"name":"Devtopia","email":"no-reply@devtopia.net"},"to":"ops@example.com","subject":"GitHub issue plan","body":"Repo: https://api.github.com/repos/octocat/hello-world/issues\nTitle: Bug report\nSignature: ..."}}
