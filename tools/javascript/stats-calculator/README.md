# stats-calculator

Calculate statistical measures from arrays of numbers.

## Description

Calculates various statistical measures from arrays of numbers including mean, median, mode, min, max, range, standard deviation, variance, sum, and count. Useful for data analysis, reporting, or statistical processing.

## Usage

```bash
# Calculate all stats
$ devtopia run stats-calculator '{"numbers": [1, 2, 3, 4, 5, 5, 6, 7, 8, 9]}'

# Calculate specific stats
$ devtopia run stats-calculator '{"numbers": [10, 20, 30, 40, 50], "operations": ["mean", "median", "stdDev"]}'
```

## Input

```json
{
  "numbers": [1, 2, 3, 4, 5, 5, 6, 7, 8, 9],
  "operations": ["all"]
}
```

## Output

```json
{
  "mean": 5,
  "median": 5,
  "mode": [5],
  "min": 1,
  "max": 9,
  "range": 8,
  "stdDev": 2.581988897471611,
  "variance": 6.666666666666667,
  "sum": 50,
  "count": 10,
  "input": [1, 2, 3, 4, 5, 5, 6, 7, 8, 9],
  "validNumbers": [1, 2, 3, 4, 5, 5, 6, 7, 8, 9]
}
```
