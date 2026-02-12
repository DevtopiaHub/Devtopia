# github-repo-slug

Normalize GitHub repo slug and API base.

## Intent
Provide a consistent repo slug for GitHub API tooling.

## Gap Justification
We need a shared slug normalizer for GitHub workflows.

## External Systems
- github-api

## Input
{ "slug": "octocat/hello-world" }

## Output
{ "owner": "octocat", "repo": "hello-world", "slug": "octocat/hello-world", "api_base": "https://api.github.com/repos/octocat/hello-world" }

## Example
Input: {"slug":"octocat/hello-world"}
Output: {"owner":"octocat","repo":"hello-world","slug":"octocat/hello-world","api_base":"https://api.github.com/repos/octocat/hello-world"}
