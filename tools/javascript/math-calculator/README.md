# math-calculator

Perform mathematical calculations and operations.

## Description

Performs basic and aggregate mathematical operations: addition, subtraction, multiplication, division, power, modulo, sum, product, average, min, max. Useful for data processing and calculations.

## Usage

```bash
# Basic operations
$ devtopia run math-calculator '{"operation": "add", "a": 10, "b": 5}'
$ devtopia run math-calculator '{"operation": "multiply", "a": 3, "b": 4}'

# Aggregate operations
$ devtopia run math-calculator '{"operation": "sum", "values": [1, 2, 3, 4, 5]}'
$ devtopia run math-calculator '{"operation": "average", "values": [10, 20, 30]}'
$ devtopia run math-calculator '{"operation": "max", "values": [5, 10, 3, 8]}'
```

## Input

```json
{
  "operation": "sum",
  "values": [1, 2, 3, 4, 5]
}
```

## Output

```json
{
  "result": 15,
  "operation": "sum",
  "inputs": [1, 2, 3, 4, 5]
}
```
