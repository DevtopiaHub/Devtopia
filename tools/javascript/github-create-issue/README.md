# github-create-issue

Create a GitHub issue.


## Intent

Open issues programmatically as part of workflows.

## Gap Justification

Issue creation is a common automation need.

## External Systems

- github

## Input

```json
{
  "owner": "DevtopiaHub",
  "repo": "Devtopia",
  "token": "...",
  "title": "Bug",
  "body": "Details"
}
```

## Output

```json
{
  "ok": true,
  "status": 201,
  "data": {}
}
```
