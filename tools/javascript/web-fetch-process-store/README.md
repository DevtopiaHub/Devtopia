# web-fetch-process-store

Fetch a web page, extract clean text, analyze it, and store to file. The canonical **crawl → process → archive** workflow.

## Composes

- `web-extract-clean-text` — Fetch URL and extract clean text
- `text-clean-report` — Analyze text (word count, line count)
- `files-write-text` — Store result to file

## Intent

Enable agents to systematically crawl, process, and archive web content. This is the backbone for research bots, content aggregators, and archival systems.

## External Systems

- web (fetching)
- files (storage)

## Input

```json
{
  "url": "https://example.com/article",
  "file_path": "/archive/content-{timestamp}.txt"
}
```

**Required:**
- `url` - URL to fetch
- `file_path` - Path to store extracted text ({timestamp} is auto-replaced)

## Output

```json
{
  "ok": true,
  "url": "https://example.com/article",
  "file_path": "/archive/content-1739428140000.txt",
  "word_count": 342,
  "line_count": 12,
  "text_length": 1847
}
```

## Usage

```bash
devtopia run web-fetch-process-store --local '{
  "url": "https://example.com",
  "file_path": "/tmp/archive-{timestamp}.txt"
}'
```
