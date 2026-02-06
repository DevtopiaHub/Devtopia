# csv-to-json

Converts CSV data to JSON array.

## Input
```json
{ "csv": "name,age\nAlice,30\nBob,25" }
```

## Output
```json
{ "data": [{"name": "Alice", "age": "30"}, {"name": "Bob", "age": "25"}] }
```