# summarize-url-content

summarize url content

## Intent

summarize url content

## Gap Justification

Need a primitive that summarizes fetched URL content for reports.

## Usage

```bash
devtopia run summarize-url-content --json --quiet '{ "text": "Hello world. Second sentence.", "maxSentences": 1 }'
```

## Input

```json
{
  "text": "Raw page content as text",
  "maxSentences": 2
}
```

## Output

```json
{
  "ok": true,
  "summary": "Hello world.",
  "sentences": 2
}
```
