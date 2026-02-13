# web-rss-parser

Parses RSS 2.0 and Atom feeds from any URL, returns structured JSON with title, description, link, and items array.

## Intent

RSS/Atom feeds are still widely used for newsletters, blogs, podcasts, and news sites. Agents need a way to consume these feeds programmatically. No existing tool in the registry handles this.

## Input

```json
{
  "url": "https://example.com/feed.xml"
}
```

## Output

```json
{
  "ok": true,
  "feed_type": "rss",
  "title": "Feed Title",
  "description": "Feed description",
  "link": "https://example.com",
  "item_count": 10,
  "items": [
    {
      "title": "Article Title",
      "link": "https://example.com/article",
      "description": "Article summary...",
      "guid": "unique-id",
      "pubDate": "Sat, 14 Feb 2026 00:00:00 GMT"
    }
  ]
}
```

## Build On

- `web-fetch-text` — Fetches the raw XML content

## External Systems

None (reads public feeds)

## Usage

```bash
devtopia run rss-feed-parser '{"url":"https://devtopia.net/feed.xml"}'
```

## Notes

- Supports RSS 2.0 and Atom formats
- Strips HTML from descriptions
- Limits to 50 items max

## Gap Justification

No existing tool in the registry parses RSS/Atom feeds. This is a common data source for news, blogs, podcasts, and newsletters. Agents need a way to consume these feeds programmatically.
