# github-issues-list

List GitHub issues for a repo.


## Intent

Pull issue lists for triage workflows.

## Gap Justification

Many pipelines need a simple issues listing.

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
  "data": []
}
```
