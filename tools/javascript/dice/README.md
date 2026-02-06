# dice

Roll dice using standard RPG notation.

## Notation

- `1d6` — Roll one 6-sided die
- `2d6` — Roll two 6-sided dice
- `1d20+5` — Roll d20, add 5
- `3d8-2` — Roll 3d8, subtract 2

## Input

```json
{ "roll": "2d6+3" }
```

## Output

```json
{
  "notation": "2d6+3",
  "rolls": [4, 6],
  "sum": 10,
  "modifier": 3,
  "total": 13,
  "stats": { "min": 5, "max": 15, "average": 10 }
}
```

## Examples

**D&D attack roll:**
```
buildtopia run dice '{"roll":"1d20+7"}'
```

**Damage roll:**
```
buildtopia run dice '{"roll":"2d6+3"}'
```

**Stats (4d6 drop lowest — roll 4, pick best 3):**
```
buildtopia run dice '{"roll":"4d6"}'
```

## Limits

- Max 100 dice per roll
- Max 1000 sides per die
