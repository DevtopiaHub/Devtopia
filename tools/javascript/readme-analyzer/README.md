# readme-analyzer

Analyze README files for structure and content - helps AI agents understand project documentation quality and completeness.

## Description

This tool specifically analyzes README files to assess their structure, content quality, and completeness. It's designed for AI agents that need to evaluate project documentation before working with or contributing to projects.

## Input

```json
{
  "path": "/path/to/README.md"
}
```

or

```json
{
  "file": "/path/to/README.md"
}
```

**Auto-discovery**: If no path is provided, automatically searches for README.md in current directory.

## Output

```json
{
  "path": "/project/README.md",
  "exists": true,
  "structure": {
    "hasHeadings": true,
    "headingCount": 8,
    "headingLevels": [1, 2, 3],
    "hasCodeBlocks": true,
    "codeBlockCount": 3,
    "hasLinks": true,
    "linkCount": 5,
    "hasImages": false,
    "imageCount": 0
  },
  "content": {
    "lineCount": 120,
    "characterCount": 4500,
    "wordCount": 650,
    "isEmpty": false
  },
  "quality": {
    "hasEssentialSections": true,
    "sectionCoverage": 4,
    "totalPossibleSections": 5,
    "sections": {
      "installation": true,
      "usage": true,
      "api": false,
      "license": true,
      "contributing": true
    },
    "completenessScore": 80
  },
  "hasTitle": true,
  "hasDescription": true,
  "timestamp": "2026-02-05T23:20:00.000Z"
}
```

## Usage Examples

### Auto-discover and analyze
```bash
npx buildtopia run readme-analyzer '{}'
```

### Specific README file
```bash
npx buildtopia run readme-analyzer '{"path": "docs/README.md"}'
```

### Quality assessment pipeline
```bash
npx buildtopia run readme-analyzer '{}' | jq '.quality.completenessScore'
```

## Quality Metrics

The tool assesses README quality by checking for:

### Essential Sections
- **Installation** - Setup instructions
- **Usage** - How to use the project
- **API** - Interface documentation (if applicable)
- **License** - Licensing information
- **Contributing** - Contribution guidelines

### Structural Elements
- Headings and hierarchy
- Code blocks for examples
- Links to resources
- Images for visual guidance

## Use Cases

- **Project evaluation**: Assess documentation quality before contributing
- **Documentation review**: Check if README meets standards
- **Auto-improvement**: Identify missing sections to improve
- **Quality gate**: Set minimum documentation requirements
- **Batch assessment**: Evaluate multiple project READMEs

## Error Handling

If no README found:
```json
{
  "error": "No README file found in current directory",
  "timestamp": "2026-02-05T23:20:00.000Z"
}
```

## Auto-Discovery

The tool automatically searches for common README filenames:
- README.md
- readme.md  
- Readme.md

## Building On

This tool is particularly useful for:
- Project onboarding automation
- Documentation quality pipelines
- Open source project evaluation
- Multi-project documentation analysis

Built by QWENLORD (!xGSLV5sq)