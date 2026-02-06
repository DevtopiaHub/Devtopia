#!/usr/bin/env npx ts-node
/**
 * validate-json - Validate JSON structure and provide detailed error info
 * 
 * Input: {"json": "{\"key\": \"value\"}"} or {"json": "invalid json"}
 * Output: {"valid": true} or {"valid": false, "error": {...}}
 */

interface Input {
  json: string;
  schema?: Record<string, string>; // Simple type checking: {"name": "string", "age": "number"}
}

interface ValidationResult {
  valid: boolean;
  parsed?: unknown;
  error?: {
    message: string;
    position?: number;
    line?: number;
    column?: number;
    context?: string;
  };
  stats?: {
    keys: number;
    depth: number;
    type: string;
    size: number;
  };
  schemaErrors?: string[];
}

function getDepth(obj: unknown, current = 0): number {
  if (typeof obj !== 'object' || obj === null) return current;
  
  let maxDepth = current;
  for (const value of Object.values(obj)) {
    const depth = getDepth(value, current + 1);
    if (depth > maxDepth) maxDepth = depth;
  }
  return maxDepth;
}

function countKeys(obj: unknown): number {
  if (typeof obj !== 'object' || obj === null) return 0;
  
  let count = Object.keys(obj).length;
  for (const value of Object.values(obj)) {
    count += countKeys(value);
  }
  return count;
}

function findErrorPosition(json: string, position: number): { line: number; column: number; context: string } {
  const lines = json.substring(0, position).split('\n');
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;
  
  // Get context around the error
  const allLines = json.split('\n');
  const contextStart = Math.max(0, line - 2);
  const contextEnd = Math.min(allLines.length, line + 1);
  const context = allLines.slice(contextStart, contextEnd).join('\n');
  
  return { line, column, context };
}

function validateSchema(obj: unknown, schema: Record<string, string>): string[] {
  const errors: string[] = [];
  
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    errors.push('Root must be an object for schema validation');
    return errors;
  }
  
  const record = obj as Record<string, unknown>;
  
  for (const [key, expectedType] of Object.entries(schema)) {
    if (!(key in record)) {
      errors.push(`Missing required field: ${key}`);
      continue;
    }
    
    const actualType = Array.isArray(record[key]) ? 'array' : typeof record[key];
    if (actualType !== expectedType) {
      errors.push(`Field "${key}" should be ${expectedType}, got ${actualType}`);
    }
  }
  
  return errors;
}

function main() {
  const input: Input = JSON.parse(process.argv[2] || '{}');
  
  if (!input.json) {
    console.log(JSON.stringify({ error: 'Missing required field: json (string to validate)' }));
    process.exit(1);
  }
  
  const result: ValidationResult = { valid: false };
  
  try {
    const parsed = JSON.parse(input.json);
    result.valid = true;
    result.parsed = parsed;
    
    result.stats = {
      keys: countKeys(parsed),
      depth: getDepth(parsed),
      type: Array.isArray(parsed) ? 'array' : typeof parsed,
      size: input.json.length
    };
    
    // Schema validation if provided
    if (input.schema) {
      const schemaErrors = validateSchema(parsed, input.schema);
      if (schemaErrors.length > 0) {
        result.valid = false;
        result.schemaErrors = schemaErrors;
      }
    }
  } catch (e) {
    const error = e as SyntaxError;
    result.valid = false;
    
    // Extract position from error message
    const posMatch = error.message.match(/position (\d+)/);
    const position = posMatch ? parseInt(posMatch[1]) : undefined;
    
    result.error = {
      message: error.message
    };
    
    if (position !== undefined) {
      const { line, column, context } = findErrorPosition(input.json, position);
      result.error.position = position;
      result.error.line = line;
      result.error.column = column;
      result.error.context = context;
    }
  }
  
  console.log(JSON.stringify(result));
}

main();
