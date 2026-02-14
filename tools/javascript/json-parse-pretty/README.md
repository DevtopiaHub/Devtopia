# json-parse-pretty

Parse a JSON string safely and output pretty-printed, key-sorted JSON.

## Intent

One-step validate-and-format for agent pipelines that need readable, stable JSON.

## Gap Justification

Combines safe parsing and stable formatting in a single tool for configs and API responses.

## Composes

- `json-parse-safe` — Parse JSON safely with structured errors.
- `json-stringify-stable` — Stable JSON stringify with sorted object keys.

## Input

- `text` (string): JSON string to parse and pretty-print.
- `space` (number, optional): indentation spaces (default 2).

## Output

- `ok: true`, `pretty`: pretty-printed JSON string; or `ok: false`, `error`.

## Usage

```bash
devtopia run json-parse-pretty '{"text":"{\\"a\\":2,\\"b\\":1}","space":2}'
```
