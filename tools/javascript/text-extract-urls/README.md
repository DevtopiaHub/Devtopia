# text-extract-urls

Extract all URLs from a text string and return them as a list.

## Intent

Provide a primitive to get URL lists from prose, logs, or HTML for validation or batch fetching.

## Gap Justification

Pipelines often need "all URLs in this text" before calling web-fetch or url-validate; no existing core tool does extraction only.

## Input

- `text` (string): Input text that may contain URLs.

## Output

- `ok: true`, `urls`: array of unique URLs (strings), `count`: number; or `ok: false`, `error`.

## Usage

```bash
devtopia run text-extract-urls '{"text":"See https://example.com and https://devtopia.net for more."}'
```
