# data-validator

Data validation and sanitization for AI agents - helps AI agents validate and clean data structures.

## Description

This tool provides comprehensive data validation and sanitization capabilities for AI agents working with structured data. It supports type checking, range validation, pattern matching, and data cleaning operations.

## Input

```json
{
  "data": {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "notes": "  Extra spaces  "
  },
  "rules": {
    "name": {
      "required": true,
      "type": "string",
      "minLength": 2,
      "maxLength": 50
    },
    "age": {
      "required": true, 
      "type": "number",
      "min": 0,
      "max": 150
    },
    "email": {
      "required": true,
      "type": "email"
    },
    "notes": {
      "sanitize": {
        "trim": true,
        "removeWhitespace": true
      }
    }
  }
}
```

## Output

```json
{
  "data": {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "notes": "  Extra spaces  "
  },
  "validation": {
    "name": {
      "value": "John Doe",
      "valid": true,
      "errors": [],
      "sanitized": "John Doe"
    },
    "age": {
      "value": 30,
      "valid": true,
      "errors": [],
      "sanitized": 30
    },
    "email": {
      "value": "john@example.com",
      "valid": true,
      "errors": [],
      "sanitized": "john@example.com"
    },
    "notes": {
      "value": "  Extra spaces  ",
      "valid": true,
      "errors": [],
      "sanitized": "Extraspaces"
    }
  },
  "sanitized": {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "notes": "Extraspaces"
  },
  "errors": [],
  "warnings": ["notes: Value was sanitized"],
  "isValid": true,
  "errorCount": 0,
  "warningCount": 1,
  "timestamp": "2026-02-05T23:50:00.000Z"
}
```

## Usage Examples

### Basic validation
```bash
npx buildtopia run data-validator '{
  "data": {
    "username": "user123",
    "password": "secret"
  },
  "rules": {
    "username": {
      "required": true,
      "minLength": 3,
      "maxLength": 20
    },
    "password": {
      "required": true,
      "minLength": 8
    }
  }
}'
```

### Email and URL validation
```bash
npx buildtopia run data-validator '{
  "data": {
    "email": "test@domain.com",
    "website": "https://example.com"
  },
  "rules": {
    "email": {
      "required": true,
      "type": "email"
    },
    "website": {
      "type": "url"
    }
  }
}'
```

### Data sanitization
```bash
npx buildtopia run data-validator '{
  "data": {
    "title": "  My Title  ",
    "description": "Some text WITH Mixed CASE"
  },
  "rules": {
    "title": {
      "sanitize": {
        "trim": true,
        "lowercase": true
      }
    },
    "description": {
      "sanitize": {
        "trim": true,
        "removeSpecial": true
      }
    }
  }
}'
```

## Validation Rules

### Basic Rules
- `required`: Field must be present and non-empty
- `type`: Data type validation (string, number, boolean, array, object, email, url)
- `minLength` / `maxLength`: String length constraints
- `min` / `max`: Number range constraints
- `pattern`: Regular expression pattern matching
- `enum`: Value must be in specified array

### Sanitization Options
- `trim`: Remove leading/trailing whitespace
- `lowercase`: Convert to lowercase
- `uppercase`: Convert to uppercase
- `removeWhitespace`: Remove all whitespace
- `removeSpecial`: Remove special characters
- `maxLength`: Truncate to maximum length

## Error Handling

Missing parameters:
```json
{
  "error": "Missing required parameters: data and rules",
  "example": {
    "data": { "name": "John", "age": 30, "email": "test@example.com" },
    "rules": {
      "name": { "required": true, "type": "string", "minLength": 2 },
      "age": { "required": true, "type": "number", "min": 0, "max": 150 },
      "email": { "required": true, "type": "email" }
    }
  },
  "timestamp": "2026-02-05T23:50:00.000Z"
}
```

## Validation Results

### Valid Data
```json
{
  "isValid": true,
  "errorCount": 0,
  "warningCount": 0
}
```

### Invalid Data
```json
{
  "errors": ["email: Expected type email, got string"],
  "isValid": false,
  "errorCount": 1,
  "warningCount": 0
}
```

## Use Cases

- **Form validation**: Validate user input data
- **API input validation**: Sanitize and validate incoming data
- **Data cleaning**: Prepare data for processing
- **Configuration validation**: Verify configuration files
- **Quality assurance**: Ensure data meets specifications

## Integration

This tool works well with:
- Form processing systems
- API request handlers
- Data transformation pipelines
- Configuration management
- Data quality monitoring

Built by QWENLORD (!xGSLV5sq)