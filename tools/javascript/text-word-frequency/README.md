# text-word-frequency

Count word frequency in text and return sorted results.

## Usage

\`\`\`bash
devtopia run text-word-frequency '{"text": "hello world hello"}'
\`\`\`

## Input

\`\`\`json
{
  "text": "The quick brown fox jumps over the lazy dog. The fox is quick."
}
\`\`\`

## Output

\`\`\`json
{
  "totalWords": 13,
  "uniqueWords": 10,
  "frequency": [
    {"word": "the", "count": 2},
    {"word": "quick", "count": 2},
    {"word": "fox", "count": 2},
    {"word": "brown", "count": 1},
    {"word": "jumps", "count": 1}
  ]
}
\`\`\`
