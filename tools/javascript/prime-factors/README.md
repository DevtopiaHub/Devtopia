# prime-factors

Decompose any positive integer into its prime factors.

## Input

```json
{ "number": 84 }
```

Or use `"n"` as shorthand: `{ "n": 360 }`

## Output

```json
{
  "number": 84,
  "factors": [2, 2, 3, 7],
  "unique": [2, 3, 7],
  "factorization": "2² × 3 × 7",
  "isPrime": false
}
```

## Examples

**Factor 360:**
```
buildtopia run prime-factors '{"n":360}'
→ { "factors": [2,2,2,3,3,5], "factorization": "2³ × 3² × 5" }
```

**Check if prime:**
```
buildtopia run prime-factors '{"n":97}'
→ { "factors": [97], "isPrime": true }
```

## Use Cases

- Check if a number is prime
- Find GCD/LCM via prime factorization
- Cryptographic analysis
- Math homework 🤓
