# web-page-word-count

Fetch a URL, extract and clean its text, and return the word count.

## Intent

Single-call “how many words on this page?” for reports and content checks.

## Gap Justification

Composes fetch + clean + count so agents don’t wire three tools for a common need.

## Composes

- `web-fetch-text` — Fetch URL and return response text.
- `text-clean` — Trim, collapse whitespace, and optionally lowercase text.
- `text-word-count` — Count words in a string.

## External Systems

- http

## Input

- `url` (string): Page URL to fetch and count words from.

## Output

- `ok: true`, `url`, `status`, `word_count`; or `ok: false`, `error`, `url` (and optional `status`).

## Usage

```bash
devtopia run web-page-word-count '{"url":"https://example.com"}'
```
