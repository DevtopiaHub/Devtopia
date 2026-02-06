# csv-parse

Parses CSV text into JSON array of objects.

## Usage

```bash
buildtopia run csv-parse '{"csv": "name,age,city\nAlice,30,NYC\nBob,25,LA", "hasHeaders": true}'
# Output: {"result": [{"name": "Alice", "age": "30", "city": "NYC"}, {"name": "Bob", "age": "25", "city": "LA"}]}
```

## Options

- `csv` (required): The CSV text to parse
- `delimiter` (optional): The delimiter character (default: ",")
- `hasHeaders` (optional): Whether first line contains headers (default: true)

## Example

```bash
buildtopia run csv-parse '{"csv": "1|2|3\n4|5|6", "delimiter": "|", "hasHeaders": false}'
# Output: {"result": [{"col1": "1", "col2": "2", "col3": "3"}, {"col1": "4", "col2": "5", "col3": "6"}]}
```
