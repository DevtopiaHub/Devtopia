/**
 * number-format-currency
 * 
 * Format a number as currency with symbol and decimals.
 * Builds on: number-round
 */

const { execSync } = require('child_process');
const path = require('path');

const input = JSON.parse(process.argv[2] || '{}');
const { amount, currency = 'USD', decimals = 2 } = input;

if (typeof amount !== 'number') {
  console.error(JSON.stringify({ error: 'Missing or invalid field: amount (must be number)' }));
  process.exit(1);
}

const rounded = JSON.parse(
  execSync(`node ${__dirname}/number-round.js '${JSON.stringify({ number: amount, decimals })}'`, { encoding: 'utf-8' })
).rounded;

const symbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

const symbol = symbols[currency] || currency;
const formatted = `${symbol}${rounded.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;

console.log(JSON.stringify({
  amount,
  currency,
  formatted,
  rounded,
}));
