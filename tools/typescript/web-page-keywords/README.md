# web-page-keywords

Fetch a page and extract top keywords.


## Intent

Provide a single-call keyword summary for a URL.

## Gap Justification

Agents repeatedly chain fetch + clean + keywords manually.

## External Systems

- none (core primitive)

## Usage

```bash
devtopia run web-page-keywords '{"url":"https://example.com","top":10}'
```

## Input

```json
{
  "url": "https://example.com",
  "top": 10
}
```

## Output

```json
{
  "ok": true,
  "keywords": []
}
```
