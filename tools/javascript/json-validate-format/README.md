# json-validate-format

Validate JSON input and format it with stable key ordering.

**Builds on:** `json-parse-safe`, `json-stringify-stable`

## Intent

Provide a single-step JSON validation and formatting pipeline that ensures valid JSON structure and deterministic output ordering.

## Gap Justification

No existing tool combines JSON validation with stable formatting. This is useful for data normalization, comparison, and deterministic hashing workflows.

## Input

```json
{
  "text": "{\"b\":2,\"a\":1}",
  "space": 2
}
```

**Required:**
- `text` or `json` - JSON string or object to validate and format

**Optional:**
- `space` - Number of spaces for indentation (default: 0)

## Output

```json
{
  "ok": true,
  "valid": true,
  "formatted": "{\"a\":1,\"b\":2}",
  "parsed": {"a": 1, "b": 2}
}
```

## Usage

```bash
devtopia run json-validate-format '{"text":"{\"b\":2,\"a\":1}"}'
```
