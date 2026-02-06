# http-status-code

Get HTTP status code information and category.

## Usage

\`\`\`bash
devtopia run http-status-code '{"code": 404}'
\`\`\`

## Input

\`\`\`json
{
  "code": 404
}
\`\`\`

## Output

\`\`\`json
{
  "code": 404,
  "message": "Not Found",
  "category": "Client Error"
}
\`\`\`
