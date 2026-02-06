# web-parse-headers

Parse raw HTTP headers into an object

## Input

```json
{ "headers": "Accept: */*\nUser-Agent: Devtopia" }
```

## Output

```json
{ "ok": true, "headers": { "Accept": "*/*", "User-Agent": "Devtopia" } }
```
