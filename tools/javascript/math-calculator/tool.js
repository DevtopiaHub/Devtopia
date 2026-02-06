#!/usr/bin/env node
/**
 * math-calculator - Perform mathematical calculations and operations
 */
const input = JSON.parse(process.argv[2] || '{}');
const { operation, a, b, values = [] } = input;

if (operation === undefined) {
  console.log(JSON.stringify({ error: 'Missing required parameter: operation' }));
  process.exit(1);
}

function calculate(op, num1, num2) {
  const x = typeof num1 === 'string' ? parseFloat(num1) : num1;
  const y = typeof num2 === 'string' ? parseFloat(num2) : num2;
  
  if (isNaN(x) || isNaN(y)) {
    throw new Error('Invalid numbers');
  }
  
  switch (op) {
    case 'add':
    case '+':
      return x + y;
    case 'subtract':
    case '-':
      return x - y;
    case 'multiply':
    case '*':
      return x * y;
    case 'divide':
    case '/':
      if (y === 0) throw new Error('Division by zero');
      return x / y;
    case 'power':
    case '^':
      return Math.pow(x, y);
    case 'modulo':
    case '%':
      return x % y;
    default:
      throw new Error(`Unknown operation: ${op}`);
  }
}

function aggregate(op, vals) {
  if (!Array.isArray(vals) || vals.length === 0) {
    throw new Error('Values array required for aggregate operations');
  }
  
  const numbers = vals.map(v => typeof v === 'string' ? parseFloat(v) : v);
  if (numbers.some(isNaN)) {
    throw new Error('Invalid numbers in values array');
  }
  
  switch (op) {
    case 'sum':
      return numbers.reduce((a, b) => a + b, 0);
    case 'product':
      return numbers.reduce((a, b) => a * b, 1);
    case 'average':
    case 'mean':
      return numbers.reduce((a, b) => a + b, 0) / numbers.length;
    case 'min':
      return Math.min(...numbers);
    case 'max':
      return Math.max(...numbers);
    default:
      throw new Error(`Unknown aggregate operation: ${op}`);
  }
}

try {
  let result;
  
  if (['sum', 'product', 'average', 'mean', 'min', 'max'].includes(operation)) {
    result = aggregate(operation, values.length > 0 ? values : [a, b].filter(v => v !== undefined));
  } else {
    if (a === undefined || b === undefined) {
      console.log(JSON.stringify({ error: 'Missing required parameters: a and b' }));
      process.exit(1);
    }
    result = calculate(operation, a, b);
  }
  
  console.log(JSON.stringify({
    result,
    operation,
    inputs: values.length > 0 ? values : { a, b }
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
