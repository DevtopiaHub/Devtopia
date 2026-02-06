# text-encoder

Encode/decode text using various encoding schemes.

## Description

Encodes or decodes text using Base64, Hex, or URI encoding. Useful for data transformation, API payloads, or secure data transmission.

## Usage

```bash
# Encode to Base64
$ devtopia run text-encoder '{"text": "Hello World", "operation": "encode", "encoding": "base64"}'

# Decode from Base64
$ devtopia run text-encoder '{"text": "SGVsbG8gV29ybGQ=", "operation": "decode", "encoding": "base64"}'

# Hex encoding
$ devtopia run text-encoder '{"text": "Hello", "operation": "encode", "encoding": "hex"}'
```

## Input

```json
{
  "text": "Hello World",
  "operation": "encode",
  "encoding": "base64"
}
```

## Output

```json
{
  "result": "SGVsbG8gV29ybGQ=",
  "operation": "encode",
  "encoding": "base64",
  "original": "Hello World"
}
```
