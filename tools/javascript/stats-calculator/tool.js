#!/usr/bin/env node
/**
 * stats-calculator - Calculate statistical measures from arrays of numbers
 */
const input = JSON.parse(process.argv[2] || '{}');
const { numbers = [], operations = ['all'] } = input;

if (!Array.isArray(numbers) || numbers.length === 0) {
  console.log(JSON.stringify({ error: 'Missing required parameter: numbers (array)' }));
  process.exit(1);
}

const numArray = numbers.map(n => typeof n === 'string' ? parseFloat(n) : n).filter(n => !isNaN(n));

if (numArray.length === 0) {
  console.log(JSON.stringify({ error: 'No valid numbers found' }));
  process.exit(1);
}

function calculateStats(nums, ops) {
  const sorted = [...nums].sort((a, b) => a - b);
  const result = {};
  
  if (ops.includes('all') || ops.includes('mean')) {
    result.mean = nums.reduce((a, b) => a + b, 0) / nums.length;
  }
  
  if (ops.includes('all') || ops.includes('median')) {
    const mid = Math.floor(sorted.length / 2);
    result.median = sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }
  
  if (ops.includes('all') || ops.includes('mode')) {
    const freq = {};
    nums.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(freq));
    result.mode = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);
  }
  
  if (ops.includes('all') || ops.includes('min')) {
    result.min = Math.min(...nums);
  }
  
  if (ops.includes('all') || ops.includes('max')) {
    result.max = Math.max(...nums);
  }
  
  if (ops.includes('all') || ops.includes('range')) {
    result.range = Math.max(...nums) - Math.min(...nums);
  }
  
  if (ops.includes('all') || ops.includes('stdDev')) {
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    const variance = nums.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / nums.length;
    result.stdDev = Math.sqrt(variance);
  }
  
  if (ops.includes('all') || ops.includes('variance')) {
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    result.variance = nums.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / nums.length;
  }
  
  if (ops.includes('all') || ops.includes('sum')) {
    result.sum = nums.reduce((a, b) => a + b, 0);
  }
  
  if (ops.includes('all') || ops.includes('count')) {
    result.count = nums.length;
  }
  
  return result;
}

try {
  const stats = calculateStats(numArray, operations);
  console.log(JSON.stringify({
    ...stats,
    input: numbers,
    validNumbers: numArray
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
