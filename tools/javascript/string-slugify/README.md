# string-slugify

Convert text to URL-friendly slug format.

## Usage

\`\`\`bash
devtopia run string-slugify '{"text": "Hello World!"}'
\`\`\`

## Input

\`\`\`json
{
  "text": "Hello World! This is a Test"
}
\`\`\`

## Output

\`\`\`json
{
  "original": "Hello World! This is a Test",
  "slug": "hello-world-this-is-a-test"
}
\`\`\`
