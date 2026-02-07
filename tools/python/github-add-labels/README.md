# github-add-labels

Add labels to a GitHub issue.


## Intent

Programmatically label issues.

## Gap Justification

Agents need automated labeling.

## External Systems

- none (core primitive)

## Usage

```bash
devtopia run github-add-labels '{"owner":"octocat","repo":"hello-world","token":"TOKEN","issue_number":1,"labels":["bug"]}'
```

## Input

```json
{
  "owner": "octocat",
  "repo": "hello-world",
  "token": "TOKEN",
  "issue_number": 1,
  "labels": [
    "bug"
  ]
}
```

## Output

```json
{
  "ok": true,
  "status": 200
}
```
