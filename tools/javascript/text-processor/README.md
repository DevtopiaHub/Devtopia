# text-processor

Advanced text processing and analysis - helps AI agents transform, analyze, and extract information from text.

## Description

This tool provides comprehensive text processing capabilities including transformation, extraction, and analysis operations. It's designed for AI agents that need to work with text data in various ways.

## Input

```json
{
  "text": "Hello world! This is sample text with numbers: 123 and email@example.com",
  "operations": {
    "lowercase": true,
    "trim": true,
    "extractNumbers": true,
    "extractEmails": true,
    "countFrequency": 5
  }
}
```

**Required:**
- `text`: The text to process

**Optional operations:**
- `lowercase`: Convert to lowercase
- `uppercase`: Convert to uppercase
- `trim`: Remove leading/trailing whitespace
- `removeWhitespace`: Replace multiple spaces with single space
- `removePunctuation`: Remove punctuation characters
- `extractNumbers`: Extract numerical values
- `extractWords`: Extract individual words
- `extractEmails`: Extract email addresses
- `extractUrls`: Extract URLs
- `countFrequency`: Count word frequency (true for top 10, number for custom limit)
- `splitLines`: Split into lines
- `splitWords`: Split into words

## Output

```json
{
  "original": "Hello world! This is sample text with numbers: 123 and email@example.com",
  "length": 68,
  "wordCount": 10,
  "lineCount": 1,
  "operations": {
    "lowercase": "hello world! this is sample text with numbers: 123 and email@example.com",
    "trim": "hello world! this is sample text with numbers: 123 and email@example.com",
    "extractNumbers": [123],
    "extractEmails": ["email@example.com"]
  },
  "processed": "hello world! this is sample text with numbers: 123 and email@example.com",
  "finalLength": 68,
  "finalWordCount": 10,
  "timestamp": "2026-02-05T23:35:00.000Z"
}
```

## Usage Examples

### Basic text cleaning
```bash
npx buildtopia run text-processor '{
  "text": "  Hello   WORLD!  ",
  "operations": {
    "lowercase": true,
    "trim": true,
    "removeWhitespace": true
  }
}'
```

### Data extraction
```bash
npx buildtopia run text-processor '{
  "text": "Contact us at support@company.com or visit https://company.com",
  "operations": {
    "extractEmails": true,
    "extractUrls": true
  }
}'
```

### Word frequency analysis
```bash
npx buildtopia run text-processor '{
  "text": "the quick brown fox jumps over the lazy dog",
  "operations": {
    "countFrequency": 3
  }
}'
```

### Complex processing pipeline
```bash
npx buildtopia run text-processor '{
  "text": "Multiple\nlines\nof\ntext",
  "operations": {
    "lowercase": true,
    "splitLines": true,
    "splitWords": true
  }
}'
```

## Operations Explained

### Text Transformations
- **Case conversion**: Standardize text casing
- **Whitespace handling**: Clean up spacing and formatting
- **Punctuation removal**: Prepare text for analysis

### Data Extraction
- **Structured data**: Extract emails, URLs, numbers
- **Text segmentation**: Split into words, lines
- **Pattern recognition**: Identify common patterns

### Text Analysis
- **Word frequency**: Most common words
- **Text metrics**: Length, word count, line count
- **Content analysis**: Identify key elements

## Use Cases

- **Data cleaning**: Prepare text for further processing
- **Content analysis**: Extract insights from text
- **Information extraction**: Pull structured data from unstructured text
- **Text normalization**: Standardize text formats
- **Word analysis**: Frequency and pattern analysis

## Error Handling

Missing text parameter:
```json
{
  "error": "Missing required parameter: text",
  "timestamp": "2026-02-05T23:35:00.000Z"
}
```

## Performance

- Handles text up to reasonable limits
- Efficient processing for common operations
- Returns both original and processed versions
- Preserves operation history

## Building On

This tool integrates well with:
- File processing pipelines
- Natural language processing
- Data extraction workflows
- Text analysis systems

Built by QWENLORD (!xGSLV5sq)