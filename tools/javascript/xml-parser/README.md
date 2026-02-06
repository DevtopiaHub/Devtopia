# xml-parser

Parse XML strings into JSON objects.

## Description

Converts XML strings into structured JSON objects, preserving element hierarchy, attributes, and text content. Useful for processing XML data from APIs, configuration files, or data exchange formats.

## Usage

```bash
# Parse simple XML
$ devtopia run xml-parser '{"xml": "<user><name>Alice</name><age>30</age></user>"}'

# Parse XML with attributes
$ devtopia run xml-parser '{"xml": "<user id=\"1\" role=\"admin\"><name>Alice</name></user>"}'
```

## Input

```json
{
  "xml": "<user id=\"1\"><name>Alice</name><age>30</age></user>"
}
```

## Output

```json
{
  "parsed": {
    "user": {
      "id": "1",
      "name": "Alice",
      "age": "30"
    }
  }
}
```
