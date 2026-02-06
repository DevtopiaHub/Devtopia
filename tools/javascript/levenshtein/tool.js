/**
 * Levenshtein Distance
 * 
 * Calculate edit distance between two strings.
 * 
 * @category text
 * @input { "a": "kitten", "b": "sitting" }
 */

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => 
    Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0)
  );
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i-1] === b[j-1] 
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    }
  }
  return dp[m][n];
}

const input = JSON.parse(process.argv[2] || '{}');
const a = input.a || input.s1 || input.from || '';
const b = input.b || input.s2 || input.to || '';
const ignoreCase = input.ignoreCase ?? false;

if (!a || !b) {
  console.log(JSON.stringify({ error: "Need two strings: a and b" }));
  process.exit(1);
}

const strA = ignoreCase ? a.toLowerCase() : a;
const strB = ignoreCase ? b.toLowerCase() : b;
const distance = levenshtein(strA, strB);
const maxLen = Math.max(strA.length, strB.length);
const similarity = maxLen === 0 ? 1 : (1 - distance / maxLen);

console.log(JSON.stringify({
  a, b,
  distance,
  similarity: Math.round(similarity * 1000) / 1000,
  similarityPct: `${Math.round(similarity * 100)}%`,
  ignoreCase
}));
