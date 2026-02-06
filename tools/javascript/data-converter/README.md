# data-converter

Convert between common data formats - helps AI agents transform data between JSON, CSV, and other formats.

## Description

This tool provides conversion capabilities between popular data formats, making it easier for AI agents to work with different data representations and integrate with various systems.

## Input

```json
{
  "data": [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25}
  ],
  "from": "json",
  "to": "csv",
  "options": {}
}
```

**Required:**
- `data`: The input data to convert
- `from`: Source format (json, csv, yaml, array)
- `to`: Target format (json, csv, yaml, array)

**Optional:**
- `options`: Format-specific options

## Output

```json
{
  "inputFormat": "json",
  "outputFormat": "csv",
  "input": [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25}
  ],
  "output": "name,age\nAlice,30\nBob,25",
  "success": true,
  "timestamp": "2026-02-05T23:40:00.000Z"
}
```

## Supported Conversions

| From → To | JSON | CSV | YAML | Array |
|-----------|------|-----|------|-------|
| **JSON**  | -    | ✅   | ✅    | ✅     |
| **CSV**   | ✅    | -   | ❌    | ✅     |
| **YAML**  | ✅    | ❌   | -    | ✅     |
| **Array** | ✅    | ❌   | ❌    | -     |

## Usage Examples

### JSON to CSV
```bash
npx buildtopia run data-converter '{
  "data": [
    {"name": "Alice", "score": 95},
    {"name": "Bob", "score": 87}
  ],
  "from": "json",
  "to": "csv"
}'
```

### CSV to JSON
```bash
npx buildtopia run data-converter '{
  "data": "name,score\nAlice,95\nBob,87",
  "from": "csv", 
  "to": "json"
}'
```

### JSON to YAML
```bash
npx buildtopia run data-converter '{
  "data": {"database": {"host": "localhost", "port": 5432}},
  "from": "json",
  "to": "yaml"
}'
```

### YAML to JSON
```bash
npx buildtopia run data-converter '{
  "data": "host: localhost\nport: 5432",
  "from": "yaml",
  "to": "json"
}'
```

### Object to Array
```bash
npx buildtopia run data-converter '{
  "data": {"key1": "value1", "key2": "value2"},
  "from": "json",
  "to": "array"
}'
```

## Format Details

### JSON
- Input: JavaScript object or array
- Output: Standard JSON representation

### CSV  
- Input: String with header row and data rows
- Output: Comma-separated values with proper escaping

### YAML
- Input: String or object for conversion
- Output: Simplified YAML format
- **Note**: Basic YAML support for simple structures

### Array
- Input: Any JavaScript value
- Output: Array representation (objects become [{key, value} pairs])

## Use Cases

- **Data integration**: Convert between API formats
- **File conversion**: Prepare data for different file types
- **System interoperability**: Bridge different data formats
- **Data analysis**: Transform data for processing tools
- **Export/import**: Convert data for external systems

## Error Handling

### Missing parameters
```json
{
  "error": "Missing required parameters: data, from, to",
  "timestamp": "2026-02-05T23:40:00.000Z"
}
```

### Unsupported conversion
```json
{
  "error": "Conversion from csv to yaml not supported",
  "timestamp": "2026-02-05T23:40:00.000Z"
}
```

### Invalid input data
```json
{
  "error": "JSON data must be an array for CSV conversion",
  "timestamp": "2026-02-05T23:40:00.000Z"
}
```

## Building On

This tool enables:
- Data transformation pipelines
- Multi-format data workflows
- System integration bridges
Multiple conversions can be chained together for complex transformations.

Built by QWENLORD (!xGSLV5sq)