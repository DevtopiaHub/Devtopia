# html-extract

Extracts text content from HTML.

## Usage

```bash
buildtopia run html-extract '{"html": "<p>Hello <b>world</b></p>"}'
# Output: {"result": "Hello world"}

buildtopia run html-extract '{"html": "<div><p>One</p><p>Two</p></div>", "tags": ["p"]}'
# Output: {"result": {"p": ["One", "Two"]}}
```

## Options

- `html` (required): The HTML string to extract from
- `tags` (optional): Array of tag names to extract (returns object with tag contents)
