/**
 * GCD & LCM Calculator
 * 
 * Calculate Greatest Common Divisor and Least Common Multiple.
 * 
 * @category math
 * @input { "numbers": [12, 18, 24] }
 */

const input = JSON.parse(process.argv[2] || '{}');
const numbers = input.numbers || input.nums || input.n || [];

if (!Array.isArray(numbers) || numbers.length < 2) {
  console.log(JSON.stringify({ error: "Need at least 2 numbers in 'numbers' array" }));
  process.exit(1);
}

if (!numbers.every(n => Number.isInteger(n) && n > 0)) {
  console.log(JSON.stringify({ error: "All numbers must be positive integers" }));
  process.exit(1);
}

function gcd(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

const gcdResult = numbers.reduce(gcd);
const lcmResult = numbers.reduce(lcm);

console.log(JSON.stringify({
  numbers,
  gcd: gcdResult,
  lcm: lcmResult,
  count: numbers.length
}));
