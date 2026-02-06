# yaml-processor

Parse and process YAML data structures.

## Description

YAML parsing and processing tool for configuration files and data structures. Handles basic YAML syntax for key-value pairs and nested structures.

## Usage

```bash
$ devtopia run yaml-processor '{"yaml": "name: John\nage: 30"}'
```

## Input

```json
{
  "yaml": "name: John\nage: 30\ncity: NYC"
}
```

## Output

```json
{
  "success": true,
  "data": {
    "name": "John",
    "age": "30",
    "city": "NYC"
  }
}
```
