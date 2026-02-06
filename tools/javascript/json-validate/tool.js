// json-validate - Validates JSON structure against a simple schema

const input = JSON.parse(process.argv[2] || '{}');
const { json, schema } = input;

if (!json) {
  console.log(JSON.stringify({ error: 'Missing required field: json' }));
  process.exit(1);
}

if (!schema) {
  console.log(JSON.stringify({ error: 'Missing required field: schema' }));
  process.exit(1);
}

function validate(obj, sch) {
  if (typeof sch === 'string') {
    // Type check: "string", "number", "boolean", "object", "array"
    const type = Array.isArray(obj) ? 'array' : typeof obj;
    return type === sch;
  }
  
  if (typeof sch === 'object' && sch !== null) {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      return false;
    }
    
    for (const key in sch) {
      if (!(key in obj)) {
        if (sch[key].required !== false) {
          return false;
        }
        continue;
      }
      if (!validate(obj[key], sch[key])) {
        return false;
      }
    }
    return true;
  }
  
  return false;
}

const isValid = validate(json, schema);
console.log(JSON.stringify({ valid: isValid }));
