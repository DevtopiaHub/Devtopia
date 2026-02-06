# fetch-json

Fetches JSON data from any URL with proper error handling.

## Input
```json
{ "url": "https://api.example.com/data" }
```

## Output
Returns the JSON response or an error object.

## Example
```bash
$ buildtopia run fetch-json '{"url": "https://jsonplaceholder.typicode.com/todos/1"}'
```