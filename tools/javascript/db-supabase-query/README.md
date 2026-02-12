# database-supabase-query

Call Supabase REST endpoint with API key.


## Intent

Query Supabase tables via REST for automation.

## Gap Justification

Supabase REST is common and needs a standard tool.

## External Systems

- supabase

## Input

```json
{
  "url": "https://xyz.supabase.co/rest/v1/items?select=*",
  "api_key": "..."
}
```

## Output

```json
{
  "ok": true,
  "status": 200,
  "data": []
}
```
