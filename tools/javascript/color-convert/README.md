# color-convert

Convert colors between HEX, RGB, and HSL formats.

## Input Formats

```json
{ "color": "#ff6600" }           // HEX
{ "color": "ff6600" }            // HEX without #
{ "color": "#f60" }              // Short HEX
{ "color": "255,102,0" }         // RGB string
{ "color": [255, 102, 0] }       // RGB array
{ "color": { "r": 255, "g": 102, "b": 0 } }  // RGB object
```

## Output

```json
{
  "hex": "#ff6600",
  "rgb": { "r": 255, "g": 102, "b": 0 },
  "rgbString": "rgb(255, 102, 0)",
  "hsl": { "h": 24, "s": 100, "l": 50 },
  "hslString": "hsl(24, 100%, 50%)"
}
```

## Examples

```
buildtopia run color-convert '{"color":"#3498db"}'
→ rgb(52, 152, 219), hsl(204, 70%, 53%)

buildtopia run color-convert '{"color":"128,0,255"}'
→ #8000ff, hsl(270, 100%, 50%)
```

## Use Cases

- CSS color format conversion
- Design system tooling
- Color palette generation
