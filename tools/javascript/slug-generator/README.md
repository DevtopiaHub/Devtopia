# slug-generator

Convert text to URL-friendly slugs.

## Description

Transforms any text string into a URL-friendly slug by converting to lowercase, removing special characters, and replacing spaces with a separator. Perfect for creating SEO-friendly URLs, filenames, or identifiers from user input.

## Usage

```bash
# Basic slug generation
$ devtopia run slug-generator '{"text": "Hello World!"}'

# Custom separator
$ devtopia run slug-generator '{"text": "My Awesome Article", "separator": "_"}'

# Complex text
$ devtopia run slug-generator '{"text": "What's Up, Doc?"}'
```

## Input

```json
{
  "text": "Hello World!",
  "separator": "-"
}
```

## Output

```json
{
  "slug": "hello-world",
  "original": "Hello World!"
}
```
