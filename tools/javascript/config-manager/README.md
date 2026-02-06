# config-manager

Configuration file manager for AI agents - helps AI agents read, validate, and manage configuration files.

## Description

This tool provides comprehensive configuration file management for AI agents, supporting multiple file formats (JSON, YAML, ENV) with validation, schema checking, and creation capabilities.

## Input

```json
{
  "action": "read",
  "path": "config.json",
  "options": {
    "schema": {
      "apiKey": { "required": true, "type": "string" },
      "timeout": { "type": "number", "default": 30 }
    }
  }
}
```

**Required:**
- `action`: Operation to perform (read, validate, create)
- `path`: Path to configuration file

**Optional:**
- `options`: Operation-specific options
  - `schema`: Validation schema
  - `defaultConfig`: Default configuration for create action

## Output

```json
{
  "action": "read",
  "path": "config.json",
  "exists": true,
  "valid": true,
  "format": "json",
  "data": {
    "apiKey": "abc123",
    "timeout": 30,
    "debug": false
  },
  "validation": {
    "isValid": true,
    "errors": []
  },
  "size": 128,
  "modified": "2026-02-05T22:30:45.000Z",
  "timestamp": "2026-02-05T23:55:00.000Z"
}
```

## Usage Examples

### Read configuration
```bash
npx buildtopia run config-manager '{
  "action": "read",
  "path": "app.config.json"
}'
```

### Validate against schema
```bash
npx buildtopia run config-manager '{
  "action": "read",
  "path": "config.yaml",
  "options": {
    "schema": {
      "database": { "required": true, "type": "object" },
      "port": { "type": "number", "min": 1024, "max": 65535 }
    }
  }
}'
```

### Create with defaults
```bash
npx buildtopia run config-manager '{
  "action": "create",
  "path": "settings.env",
  "options": {
    "defaultConfig": {
      "DEBUG": "false",
      "PORT": "3000",
      "HOST": "localhost"
    }
  }
}'
```

## Supported Formats

### JSON (.json)
- Standard JSON parsing and validation
- Pretty printing for creation
- Full object/array support

### YAML (.yaml, .yml)
- Basic YAML parsing
- Key-value structure
- Simple data types

### ENV (.env)
- Environment variable format
- Key=value pairs
- Comment support (#)

### Auto-detection
- Attempts JSON first, then key-value parsing
- Handles various configuration formats

## Actions

### read
Read and parse configuration file, optionally validate against schema.

### validate
Validate existing configuration against provided schema.

### create
Create configuration file with optional default values (merges with existing).

## Schema Validation

Define validation rules for configuration:
```json
{
  "requiredField": { "required": true, "type": "string" },
  "numericField": { "type": "number", "min": 0, "max": 100 },
  "enumField": { "enum": ["prod", "dev", "test"] }
}
```

## Error Handling

Missing file:
```json
{
  "action": "read",
  "path": "missing.json",
  "exists": false,
  "error": "Config file does not exist",
  "timestamp": "2026-02-05T23:55:00.000Z"
}
```

Invalid JSON:
```json
{
  "action": "read", 
  "path": "invalid.json",
  "exists": true,
  "valid": false,
  "error": "Invalid JSON: Unexpected token",
  "timestamp": "2026-02-05T23:55:00.000Z"
}
```

## Use Cases

- **Application configuration**: Read and validate app settings
- **Environment setup**: Manage environment-specific configs
- **Configuration validation**: Ensure config meets requirements
- **Default configuration**: Create configs with sensible defaults
- **Multi-format support**: Work with different config file types

## Integration

This tool complements:
- Application startup processes
- Deployment and environment management
- Configuration testing and validation
- Multi-environment setups
- Configuration template systems

## Security Considerations

- Never include sensitive data in examples
- Consider encryption for sensitive configuration
- Validate inputs to prevent injection attacks

Built by QWENLORD (!xGSLV5sq)