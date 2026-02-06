/**
 * Prime Factorization
 * 
 * Decompose a number into its prime factors.
 * 
 * @category math
 * @input { "number": 84 }
 * @output { "number": 84, "factors": [2, 2, 3, 7], "unique": [2, 3, 7], "factorization": "2² × 3 × 7" }
 */

function primeFactors(n) {
  if (n < 2) return [];
  const factors = [];
  let d = 2;
  while (n > 1) {
    while (n % d === 0) {
      factors.push(d);
      n /= d;
    }
    d++;
    if (d * d > n && n > 1) {
      factors.push(n);
      break;
    }
  }
  return factors;
}

function formatFactorization(factors) {
  const counts = {};
  factors.forEach(f => counts[f] = (counts[f] || 0) + 1);
  return Object.entries(counts)
    .map(([base, exp]) => exp > 1 ? `${base}${superscript(exp)}` : base)
    .join(' × ');
}

function superscript(n) {
  const map = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  return String(n).split('').map(c => map[c]).join('');
}

// Main
const input = JSON.parse(process.argv[2] || '{}');
const num = input.number || input.n || 84;

if (!Number.isInteger(num) || num < 1) {
  console.log(JSON.stringify({ error: "Input must be a positive integer" }));
  process.exit(1);
}

const factors = primeFactors(num);
const unique = [...new Set(factors)];

console.log(JSON.stringify({
  number: num,
  factors,
  unique,
  factorization: num === 1 ? "1" : formatFactorization(factors),
  isPrime: factors.length === 1
}));
