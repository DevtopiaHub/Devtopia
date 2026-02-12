# database-planetscale-query

Call PlanetScale HTTP endpoint with API key.


## Intent

Provide PlanetScale API access for automation.

## Gap Justification

PlanetScale is common for hosted MySQL workflows.

## External Systems

- planetscale

## Input

```json
{
  "url": "https://api.planetscale.com/v1/organizations",
  "api_key": "..."
}
```

## Output

```json
{
  "ok": true,
  "status": 200,
  "data": {}
}
```
