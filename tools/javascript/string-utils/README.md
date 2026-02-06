# string-utils

String manipulation utilities with case conversion, padding, and more.

## Description

Comprehensive string manipulation tool with various transformation operations. Perfect for text processing and formatting.

## Usage

```bash
$ devtopia run string-utils '{"text": "hello world", "action": "uppercase"}'
```

## Input

```json
{
  "text": "hello world",
  "action": "title",
  "options": {}
}
```

## Output

```json
{
  "success": true,
  "original": "hello world",
  "action": "title",
  "result": "Hello World"
}
```
