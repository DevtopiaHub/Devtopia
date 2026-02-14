/**
 * api-token-compare - Compare two tokens side by side
 * Builds on: api-dexscreener-token
 *
 * Detailed comparison of two tokens including:
 * - Price metrics
 * - Liquidity analysis
 * - Volume comparison
 * - Risk assessment
 * - Winner verdict
 *
 * @param {Object} params
 * @param {string} params.token1 - First token address
 * @param {string} params.token2 - Second token address
 * @param {string} [params.chain] - Optional chain filter
 * @returns {Object} Side-by-side comparison
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.token1 || !input.token2) {
  console.log(JSON.stringify({ error: 'Missing required fields: token1 and token2' }));
  process.exit(1);
}

try {
  // Fetch both tokens
  const t1 = devtopiaRun('api-dexscreener-token', { address: input.token1, chain: input.chain });
  const t2 = devtopiaRun('api-dexscreener-token', { address: input.token2, chain: input.chain });
  
  if (!t1.success || !t2.success) {
    console.log(JSON.stringify({ 
      success: false, 
      error: 'Could not fetch one or both tokens',
      token1Found: t1.success,
      token2Found: t2.success
    }));
    process.exit(0);
  }
  
  // Calculate metrics for comparison
  const mc1 = t1.marketCap || 0;
  const mc2 = t2.marketCap || 0;
  const liq1 = t1.liquidity || 0;
  const liq2 = t2.liquidity || 0;
  const vol1 = t1.volume24h || 0;
  const vol2 = t2.volume24h || 0;
  
  const liqRatio1 = mc1 > 0 ? (liq1 / mc1) * 100 : 0;
  const liqRatio2 = mc2 > 0 ? (liq2 / mc2) * 100 : 0;
  
  // Score each token (higher = better)
  let score1 = 0, score2 = 0;
  const verdicts = [];
  
  // Liquidity ratio comparison
  if (liqRatio1 > liqRatio2 * 1.5) {
    score1 += 2;
    verdicts.push({ metric: 'Liquidity Ratio', winner: t1.token.symbol, reason: `${liqRatio1.toFixed(1)}% vs ${liqRatio2.toFixed(1)}%` });
  } else if (liqRatio2 > liqRatio1 * 1.5) {
    score2 += 2;
    verdicts.push({ metric: 'Liquidity Ratio', winner: t2.token.symbol, reason: `${liqRatio2.toFixed(1)}% vs ${liqRatio1.toFixed(1)}%` });
  } else {
    verdicts.push({ metric: 'Liquidity Ratio', winner: 'TIE', reason: `${liqRatio1.toFixed(1)}% vs ${liqRatio2.toFixed(1)}%` });
  }
  
  // Absolute liquidity
  if (liq1 > liq2 * 2) {
    score1 += 2;
    verdicts.push({ metric: 'Absolute Liquidity', winner: t1.token.symbol, reason: `$${liq1.toLocaleString()} vs $${liq2.toLocaleString()}` });
  } else if (liq2 > liq1 * 2) {
    score2 += 2;
    verdicts.push({ metric: 'Absolute Liquidity', winner: t2.token.symbol, reason: `$${liq2.toLocaleString()} vs $${liq1.toLocaleString()}` });
  }
  
  // Volume (activity indicator)
  if (vol1 > vol2 * 1.5) {
    score1 += 1;
    verdicts.push({ metric: 'Volume 24h', winner: t1.token.symbol, reason: 'Higher trading activity' });
  } else if (vol2 > vol1 * 1.5) {
    score2 += 1;
    verdicts.push({ metric: 'Volume 24h', winner: t2.token.symbol, reason: 'Higher trading activity' });
  }
  
  // Recent performance (1h change)
  const change1h_1 = t1.priceChange?.h1 || 0;
  const change1h_2 = t2.priceChange?.h1 || 0;
  if (change1h_1 > change1h_2 + 5) {
    score1 += 1;
    verdicts.push({ metric: 'Momentum (1h)', winner: t1.token.symbol, reason: `${change1h_1.toFixed(1)}% vs ${change1h_2.toFixed(1)}%` });
  } else if (change1h_2 > change1h_1 + 5) {
    score2 += 1;
    verdicts.push({ metric: 'Momentum (1h)', winner: t2.token.symbol, reason: `${change1h_2.toFixed(1)}% vs ${change1h_1.toFixed(1)}%` });
  }
  
  // Upside potential (lower MC = more room)
  if (mc1 < mc2 / 2 && liqRatio1 >= liqRatio2 * 0.8) {
    score1 += 1;
    verdicts.push({ metric: 'Upside Potential', winner: t1.token.symbol, reason: 'Lower MC with decent liquidity' });
  } else if (mc2 < mc1 / 2 && liqRatio2 >= liqRatio1 * 0.8) {
    score2 += 1;
    verdicts.push({ metric: 'Upside Potential', winner: t2.token.symbol, reason: 'Lower MC with decent liquidity' });
  }
  
  // Determine overall winner
  let overallWinner, winnerReason;
  if (score1 > score2 + 1) {
    overallWinner = t1.token.symbol;
    winnerReason = `${t1.token.symbol} wins ${score1}-${score2}`;
  } else if (score2 > score1 + 1) {
    overallWinner = t2.token.symbol;
    winnerReason = `${t2.token.symbol} wins ${score2}-${score1}`;
  } else {
    overallWinner = 'TOO_CLOSE';
    winnerReason = `Close match: ${score1}-${score2}`;
  }
  
  console.log(JSON.stringify({
    success: true,
    comparison: {
      token1: {
        symbol: t1.token.symbol,
        name: t1.token.name,
        chain: t1.chain,
        price: t1.price,
        marketCap: mc1,
        liquidity: liq1,
        liquidityRatio: `${liqRatio1.toFixed(2)}%`,
        volume24h: vol1,
        change1h: change1h_1,
        change24h: t1.priceChange?.h24,
        url: t1.url
      },
      token2: {
        symbol: t2.token.symbol,
        name: t2.token.name,
        chain: t2.chain,
        price: t2.price,
        marketCap: mc2,
        liquidity: liq2,
        liquidityRatio: `${liqRatio2.toFixed(2)}%`,
        volume24h: vol2,
        change1h: change1h_2,
        change24h: t2.priceChange?.h24,
        url: t2.url
      }
    },
    verdicts: verdicts,
    scores: {
      [t1.token.symbol]: score1,
      [t2.token.symbol]: score2
    },
    winner: overallWinner,
    winnerReason: winnerReason,
    steps: ["api-dexscreener-token", "comparison-analysis"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
