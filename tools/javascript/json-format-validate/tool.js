/**
 * json-format-validate
 * 
 * Format JSON and validate its structure.
 * Builds on: json-pretty, json-validate
 */

const { execSync } = require('child_process');
const path = require('path');

const input = JSON.parse(process.argv[2] || '{}');
const { data, schema } = input;

if (!data) {
  console.error(JSON.stringify({ error: 'Missing required field: data' }));
  process.exit(1);
}

try {
  // Format the JSON
  const formatted = JSON.parse(
    execSync(`node ${__dirname}/json-pretty.js '${JSON.stringify({ data, indent: 2 })}'`, { encoding: 'utf-8' })
  ).formatted;
  
  // Validate if schema provided
  let validation = null;
  if (schema) {
    try {
      const validateResult = JSON.parse(
        execSync(`node ${__dirname}/json-validate.js '${JSON.stringify({ data, schema })}'`, { encoding: 'utf-8' })
      );
      validation = validateResult;
    } catch (err) {
      // json-validate might not exist, skip validation
    }
  }
  
  console.log(JSON.stringify({
    formatted,
    isValid: validation ? validation.isValid : true,
    validation: validation || undefined,
  }));
} catch (error) {
  console.error(JSON.stringify({
    error: error.message,
  }));
  process.exit(1);
}
