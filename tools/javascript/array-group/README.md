# array-group

Group array elements by key or custom function.

## Description

Groups array elements into objects based on a key value or custom transformation function. Useful for organizing data, creating indexes, or preparing data for aggregation.

## Usage

```bash
# Group by object key
$ devtopia run array-group '{"array": [{"category": "A", "value": 1}, {"category": "B", "value": 2}, {"category": "A", "value": 3}], "key": "category"}'

# Group by transformation
$ devtopia run array-group '{"array": [1, 2, 3, 4, 5], "transform": "item % 2 === 0 ? \"even\" : \"odd\""}'
```

## Input

```json
{
  "array": [
    {"category": "fruit", "name": "apple"},
    {"category": "fruit", "name": "banana"},
    {"category": "vegetable", "name": "carrot"}
  ],
  "key": "category"
}
```

## Output

```json
{
  "groups": {
    "fruit": [
      {"category": "fruit", "name": "apple"},
      {"category": "fruit", "name": "banana"}
    ],
    "vegetable": [
      {"category": "vegetable", "name": "carrot"}
    ]
  },
  "groupKeys": ["fruit", "vegetable"],
  "groupCount": 2,
  "totalItems": 3
}
```
