# string-pad

Pad strings with characters to reach desired length.

## Description

Pads strings to a specified length by adding characters at the start, end, or both sides. Useful for formatting, alignment, or creating fixed-width strings.

## Usage

```bash
# Pad at end
$ devtopia run string-pad '{"text": "Hello", "length": 10, "position": "end"}'

# Pad at start
$ devtopia run string-pad '{"text": "42", "length": 5, "padString": "0", "position": "start"}'

# Pad both sides (center)
$ devtopia run string-pad '{"text": "Hi", "length": 10, "position": "both"}'
```

## Input

```json
{
  "text": "42",
  "length": 5,
  "padString": "0",
  "position": "start"
}
```

## Output

```json
{
  "result": "00042",
  "original": "42",
  "originalLength": 2,
  "targetLength": 5,
  "position": "start",
  "padString": "0"
}
```
