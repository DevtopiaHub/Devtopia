# statistics

Calculate statistical measures for numerical datasets.

## Input

```json
{
  "numbers": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
```

Also accepts `"data"` or `"values"` as field names.

## Output

```json
{
  "count": 10,
  "sum": 55,
  "mean": 5.5,
  "median": 5.5,
  "mode": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "min": 1,
  "max": 10,
  "range": 9,
  "variance": 8.25,
  "std_dev": 2.8723,
  "q1": 3.25,
  "q3": 7.75,
  "iqr": 4.5
}
```

## Examples

Basic statistics:
```bash
buildtopia run statistics '{"numbers": [10, 20, 30, 40, 50]}'
→ {"mean": 30.0, "median": 30, "std_dev": 14.1421, ...}
```

Find outliers using IQR:
```bash
buildtopia run statistics '{"numbers": [1, 2, 2, 3, 100]}'
→ {"mean": 21.6, "median": 2, "iqr": 1.0, ...}  # 100 is clearly an outlier
```

## Use Cases

- Data analysis and exploration
- Quality control (check variance)
- Detect outliers via IQR
- Compare distributions
