# text-word-count

Count words in a text string.

## Usage

```javascript
const stats = main({ text: 'Hello world! This is a test.' });
// Returns: { words: 6, characters: 30, charactersNoSpaces: 25, sentences: 2 }
```

## Input

- `text` (string, required): Text to analyze
- `includeNumbers` (boolean, optional): Include numbers as words (default: false)

## Output

Object with `words`, `characters`, `charactersNoSpaces`, and `sentences` counts.
