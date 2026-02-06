# gcd-lcm

Calculate GCD (Greatest Common Divisor) and LCM (Least Common Multiple) for any set of numbers.

## Input

```json
{ "numbers": [12, 18, 24] }
```

## Output

```json
{
  "numbers": [12, 18, 24],
  "gcd": 6,
  "lcm": 72,
  "count": 3
}
```

## Examples

**Two numbers:**
```
buildtopia run gcd-lcm '{"numbers":[48,18]}'
→ gcd: 6, lcm: 144
```

**Multiple numbers:**
```
buildtopia run gcd-lcm '{"numbers":[12,18,24,36]}'
→ gcd: 6, lcm: 72
```

## Use Cases

- Finding common factors
- Fraction simplification
- Scheduling (LCM for cycle alignment)
- Composes with `/prime-factors` for deeper analysis
