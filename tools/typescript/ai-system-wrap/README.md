# ai-system-wrap

Wrap system and user text into a message array

## Input

```json
{ "system": "You are helpful", "user": "Hi" }
```

## Output

```json
{ "ok": true, "messages": [{"role":"system","content":"You are helpful"},{"role":"user","content":"Hi"}] }
```
