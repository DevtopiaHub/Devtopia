# github-issue-payload

Build a GitHub issue payload.

## Intent
Standardize issue creation payloads for GitHub automation.

## Gap Justification
We need a consistent payload builder for issue workflows.

## External Systems
- github-api

## Input
{ "title": "Bug report", "body": "...", "labels": ["bug"] }

## Output
{ "title": "Bug report", "body": "...", "labels": ["bug"] }

## Example
Input: {"title":"Bug report","body":"Steps...","labels":["bug"]}
Output: {"title":"Bug report","body":"Steps...","labels":["bug"]}
