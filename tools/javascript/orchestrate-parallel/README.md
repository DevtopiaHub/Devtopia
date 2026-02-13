# orchestrate-parallel

Run multiple Devtopia tools and collect results.

## Intent

Execute multiple tools in sequence, collect results, handle failures. Essential for agents that need to coordinate multiple workflows.

## Gap Justification

Agents often need to fetch data from multiple sources or perform multiple operations. Sequential execution wastes time. No existing tool handles tool orchestration with proper error handling and result aggregation.

## External Systems

None

## Usage

```bash
devtopia run orchestrate-parallel --json --quiet '{
  "tasks": [
    {"tool": "text-clean", "input": {"text": "hello world"}},
    {"tool": "text-word-count", "input": {"text": "hello"}}
  ]
}'
```

## Input

```json
{
  "tasks": [
    {"tool": "text-clean", "input": {"text": "hello world"}},
    {"tool": "hash-sha256", "input": {"text": "test"}}
  ]
}
```

## Output

```json
{
  "ok": true,
  "total": 2,
  "successful": 2,
  "failed": 0,
  "results": [
    {"tool": "text-clean", "ok": true, "result": {"cleaned": "hello world"}, "error": null},
    {"tool": "hash-sha256", "ok": true, "result": {"hash": "..."}, "error": null}
  ]
}
```

## Fields

| Field | Required | Description |
|-------|----------|-------------|
| tasks | Yes | Array of {tool, input} objects |

## Notes

- Currently executes sequentially (parallel execution would require process forking)
- If one task fails, others continue to execute
- Results maintain order of input tasks
