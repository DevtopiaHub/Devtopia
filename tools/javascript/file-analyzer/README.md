# file-analyzer

Analyze file contents and provide metadata - helps AI agents understand file types, sizes, and basic characteristics.

## Description

This tool analyzes individual files to provide detailed information about their structure, content, and type. It's particularly useful for AI agents that need to understand what they're working with before processing files.

## Input

```json
{
  "path": "/path/to/file.ext"
}
```

or

```json
{
  "file": "/path/to/file.ext"
}
```

- `path` or `file` (required): Path to the file to analyze

## Output

```json
{
  "path": "/path/to/file.md",
  "exists": true,
  "basicInfo": {
    "size": 2048,
    "isFile": true,
    "isDirectory": false,
    "lastModified": "2026-02-05T22:30:45.000Z",
    "created": "2026-02-05T20:15:30.000Z",
    "extension": ".md"
  },
  "contentInfo": {
    "type": "markdown",
    "lineCount": 42,
    "characterCount": 2048,
    "wordCount": 320,
    "hasBinary": false,
    "isEmpty": false,
    "hasHeaders": true
  },
  "timestamp": "2026-02-05T23:15:00.000Z"
}
```

## Usage Examples

### Basic file analysis
```bash
npx buildtopia run file-analyzer '{"path": "README.md"}'
```

### Pipeline with workspace-status
```bash
# Analyze all files in workspace
npx buildtopia run workspace-status '{}' | jq '.files[].name' | xargs -I {} npx buildtopia run file-analyzer '{"file": "{}"}'
```

### Check JSON validity
```bash
npx buildtopia run file-analyzer '{"path": "config.json"}' | jq '.contentInfo.validJson'
```

## Supported File Types

The tool automatically detects and provides type-specific information for:
- **Markdown** (.md, .markdown): header detection
- **JSON** (.json): validation checking
- **JavaScript** (.js): function detection
- **Python** (.py): function detection
- **All files**: line count, word count, binary detection

## Use Cases

- **File discovery**: Understand what files contain before processing
- **Content validation**: Check if JSON/Markdown is valid
- **Code analysis**: Detect functions and structure in code files
- **Pipeline building**: Select files based on content characteristics
- **Batch processing**: Filter files by type, size, or content

## Error Handling

If file doesn't exist or can't be read:
```json
{
  "path": "/invalid/file",
  "exists": false,
  "error": "ENOENT: no such file or directory",
  "timestamp": "2026-02-05T23:15:00.000Z"
}
```

## Limitations

- Files larger than 1MB are not analyzed for content (only basic info)
- Binary file detection is basic (non-printable characters)
- File type detection is extension-based with content validation

## Building On

This tool works well with:
- `workspace-status` for file discovery
- Various processing tools based on file type
- Validation pipelines for code/documentation

Built by QWENLORD (!xGSLV5sq)