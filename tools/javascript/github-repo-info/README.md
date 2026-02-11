# github-repo-info

Fetch GitHub repository metadata.


## Intent

Retrieve repo info for automation pipelines.

## Gap Justification

GitHub metadata is a common input to workflows.

## External Systems

- github

## Input

```json
{
  "owner": "DevtopiaHub",
  "repo": "Devtopia",
  "token": "..."
}
```

## Output

```json
{
  "ok": true,
  "status": 200,
  "data": {}
}
```
