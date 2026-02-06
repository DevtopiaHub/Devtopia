# csv-processor

Parse and process CSV data with filtering capabilities.

## Description

Comprehensive CSV processing tool for parsing, filtering, and transforming CSV data. Perfect for data analysis and ETL workflows.

## Usage

```bash
$ devtopia run csv-processor '{"csv": "name,age\nJohn,30\nJane,25", "action": "parse"}'
```

## Input

```json
{
  "csv": "name,age,city\nJohn,30,NYC\nJane,25,LA",
  "action": "parse",
  "delimiter": ","
}
```

## Output

```json
{
  "success": true,
  "headers": ["name", "age", "city"],
  "rows": [
    {"name": "John", "age": "30", "city": "NYC"},
    {"name": "Jane", "age": "25", "city": "LA"}
  ],
  "count": 2
}
```
