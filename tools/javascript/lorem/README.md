# lorem

Generate Lorem Ipsum placeholder text.

## Input

```json
{ "paragraphs": 3 }  // 3 paragraphs
{ "sentences": 5 }   // 5 sentences
{ "words": 20 }      // 20 words
```

Short forms: `p`, `s`, `w`

## Output

```json
{
  "type": "3 paragraph(s)",
  "text": "Lorem ipsum dolor sit amet...",
  "charCount": 1234,
  "wordCount": 200
}
```

## Examples

**One paragraph (default):**
```
buildtopia run lorem '{}'
```

**Five sentences:**
```
buildtopia run lorem '{"s":5}'
```

**Specific word count:**
```
buildtopia run lorem '{"w":50}'
```

## Use Cases

- UI mockups and prototypes
- Testing text layouts
- Placeholder content for demos
