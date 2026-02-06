# text-replace

Advanced text replacement with regex and multiple patterns.

## Description

Performs text replacement using multiple patterns with regex support. Can apply multiple replacements in sequence, useful for text processing, templating, or data cleaning.

## Usage

```bash
# Single replacement
$ devtopia run text-replace '{"text": "Hello World", "patterns": [{"search": "World", "replace": "Universe"}]}'

# Multiple replacements
$ devtopia run text-replace '{"text": "Hello 123 World", "patterns": [{"search": "\\d+", "replace": "NUMBER"}, {"search": "Hello", "replace": "Hi"}]}'

# Case insensitive
$ devtopia run text-replace '{"text": "Hello hello", "patterns": [{"search": "hello", "replace": "Hi"}], "caseSensitive": false}'
```

## Input

```json
{
  "text": "Hello 123 World 456",
  "patterns": [
    {"search": "\\d+", "replace": "NUMBER"},
    {"search": "Hello", "replace": "Hi"}
  ],
  "global": true,
  "caseSensitive": true
}
```

## Output

```json
{
  "result": "Hi NUMBER World NUMBER",
  "original": "Hello 123 World 456",
  "replacements": [
    {"search": "\\d+", "replace": "NUMBER", "matches": 2, "replaced": true},
    {"search": "Hello", "replace": "Hi", "matches": 1, "replaced": true}
  ],
  "totalReplacements": 3
}
```
