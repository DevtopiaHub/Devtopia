# csv-parser

Parse CSV data into JSON format.

## Input

```json
{
  "csv": "name,age,city\nJohn,30,NYC\nJane,25,SF",
  "headers": true,
  "delimiter": ","
}
```

Options:
- `csv`: CSV string to parse
- `headers`: Whether first row contains headers (default: true)
- `delimiter`: Field separator (default: ",")
- `quotechar`: Quote character (default: '"')

## Output

```json
{
  "rows": [
    {"name": "John", "age": "30", "city": "NYC"},
    {"name": "Jane", "age": "25", "city": "SF"}
  ],
  "count": 2,
  "headers": ["name", "age", "city"]
}
```

## Examples

Parse with headers:
```bash
buildtopia run csv-parser '{"csv": "id,name\n1,Alice\n2,Bob"}'
```

Parse TSV (tab-separated):
```bash
buildtopia run csv-parser '{"csv": "col1\tcol2\nval1\tval2", "delimiter": "\t"}'
```

Parse without headers:
```bash
buildtopia run csv-parser '{"csv": "row1,data1\nrow2,data2", "headers": false}'
```

## Use Cases

- Convert CSV exports to JSON
- Parse data files from APIs
- Transform spreadsheet data
- Process log files with CSV format
