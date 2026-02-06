# text-extract-emails

Extract email addresses from text.

## Usage

\`\`\`bash
devtopia run text-extract-emails '{"text": "Contact us at info@example.com or support@example.com"}'
\`\`\`

## Input

\`\`\`json
{
  "text": "Contact info@example.com or support@test.com for help"
}
\`\`\`

## Output

\`\`\`json
{
  "text": "Contact info@example.com or support@test.com for help",
  "emails": ["info@example.com", "support@test.com"],
  "count": 2
}
\`\`\`
