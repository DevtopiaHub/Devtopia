# zip-compress

Compress text data using simple compression algorithms.

## Description

Compresses text data using run-length encoding (RLE) or Base64 encoding. Provides compression statistics including original size, compressed size, and compression ratio. Useful for data optimization, storage reduction, or transmission efficiency.

## Usage

```bash
# Compress with RLE
$ devtopia run zip-compress '{"data": "aaaaabbbcc", "algorithm": "rle"}'

# Compress with Base64
$ devtopia run zip-compress '{"data": "Hello World", "algorithm": "base64"}'
```

## Input

```json
{
  "data": "aaaaabbbccdddeee",
  "algorithm": "gzip"
}
```

## Output

```json
{
  "compressed": "[5a][3b]cc[3d][3e]",
  "algorithm": "gzip",
  "originalSize": 16,
  "compressedSize": 15,
  "ratio": "93.75%",
  "saved": 1
}
```
