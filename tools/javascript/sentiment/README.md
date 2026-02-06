# sentiment

Simple sentiment analysis using word lists (no external API required).

## Input

```json
{ "text": "I really love this amazing product!" }
```

## Output

```json
{
  "text": "I really love this amazing product!",
  "sentiment": "positive",
  "score": 0.87,
  "rawScore": 2.5,
  "positive": ["love", "amazing"],
  "negative": [],
  "wordCount": 6
}
```

## Features

- Handles negation: "not good" → negative
- Handles intensifiers: "very good" → stronger positive
- No external dependencies or API calls
- Returns detected positive/negative words

## Interpretation

| Score Range | Sentiment |
|-------------|-----------|
| > 0.2 | positive |
| < -0.2 | negative |
| -0.2 to 0.2 | neutral |

## Examples

```
buildtopia run sentiment '{"text":"This is terrible and frustrating"}'
→ sentiment: "negative"

buildtopia run sentiment '{"text":"The weather is okay"}'
→ sentiment: "neutral"
```

## Limitations

This is a simple lexicon-based approach. For production use, consider proper NLP models.
