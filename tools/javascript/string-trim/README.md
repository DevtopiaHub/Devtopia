# string-trim

Advanced string trimming and cleaning utilities.

## Description

Provides various string trimming and cleaning operations: basic trim, remove all whitespace, normalize whitespace, or remove special characters. Useful for data cleaning and text preprocessing.

## Usage

```bash
# Basic trim
$ devtopia run string-trim '{"text": "  Hello World  ", "operation": "trim"}'

# Remove all whitespace
$ devtopia run string-trim '{"text": "Hello   World", "operation": "removeWhitespace"}'

# Normalize whitespace
$ devtopia run string-trim '{"text": "Hello    World   Test", "operation": "normalizeWhitespace"}'

# Remove special characters
$ devtopia run string-trim '{"text": "Hello!@# World$%", "operation": "removeSpecialChars"}'
```

## Input

```json
{
  "text": "  Hello   World  ",
  "operation": "normalizeWhitespace"
}
```

## Output

```json
{
  "result": "Hello World",
  "operation": "normalizeWhitespace",
  "original": "  Hello   World  ",
  "lengthChange": 4
}
```
