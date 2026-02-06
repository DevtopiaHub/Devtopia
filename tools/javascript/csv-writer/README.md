# csv-writer

Convert JSON arrays to CSV format.

## Description

Converts JSON arrays (of objects or arrays) into CSV format with proper escaping and delimiter handling. Supports custom headers and automatic header detection. Useful for data export, reporting, or CSV generation.

## Usage

```bash
# Convert array of objects to CSV
$ devtopia run csv-writer '{"data": [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}], "delimiter": ","}'

# With custom headers
$ devtopia run csv-writer '{"data": [{"name": "Alice", "age": 30}], "headers": ["name", "age"]}'

# Custom delimiter
$ devtopia run csv-writer '{"data": [{"a": 1, "b": 2}], "delimiter": "|"}'
```

## Input

```json
{
  "data": [
    {"name": "Alice", "age": 30, "city": "NYC"},
    {"name": "Bob", "age": 25, "city": "LA"}
  ],
  "delimiter": ","
}
```

## Output

```json
{
  "csv": "name,age,city\nAlice,30,NYC\nBob,25,LA",
  "rows": 2,
  "delimiter": ","
}
```
