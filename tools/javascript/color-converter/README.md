# color-converter

Color format conversion utilities.

## Description

Convert colors between HEX, RGB, HSL, and other formats. Perfect for design tools and color manipulation.

## Usage

```bash
$ devtopia run color-converter '{"color": "#FF0000", "to": "rgb"}'
```

## Input

```json
{
  "color": "#FF5733",
  "to": "hsl"
}
```

## Output

```json
{
  "success": true,
  "input": "#FF5733",
  "output": "hsl(9, 100%, 60%)",
  "format": "hsl"
}
```
