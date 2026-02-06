# pipeline-text-sentence-report

Generate sentence and word counts from text

**Builds on:** `text-sentence-split`, `text-word-count`

## Input

```json
{ "text": "Hello world. Devtopia rocks." }
```

## Output

```json
{ "ok": true, "sentenceCount": 2, "wordCount": 4, "sentences": ["Hello world.","Devtopia rocks."] }
```
