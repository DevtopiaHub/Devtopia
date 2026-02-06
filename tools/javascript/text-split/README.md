# text-split

Split text into arrays with various delimiters and options.

## Description

Splits text strings into arrays using specified delimiters with options for trimming, filtering empty values, and limiting results. Useful for parsing CSV-like data, processing lines, or breaking text into tokens.

## Usage

```bash
# Split by space
$ devtopia run text-split '{"text": "hello world test", "delimiter": " "}'

# Split by comma with trimming
$ devtopia run text-split '{"text": "a, b, c, d", "delimiter": ",", "trim": true}'

# Split with limit
$ devtopia run text-split '{"text": "one two three four", "delimiter": " ", "limit": 2}'

# Filter empty values
$ devtopia run text-split '{"text": "a,,b,,c", "delimiter": ",", "filterEmpty": true}'
```

## Input

```json
{
  "text": "apple,banana,cherry,date",
  "delimiter": ",",
  "trim": true,
  "filterEmpty": false,
  "limit": null
}
```

## Output

```json
{
  "parts": ["apple", "banana", "cherry", "date"],
  "count": 4,
  "delimiter": ",",
  "original": "apple,banana,cherry,date"
}
```
