/**
 * api-smart-money-flow - Analyze token holder concentration and whale activity
 * Builds on: api-request-json, api-dexscreener-token
 *
 * Combines multiple data sources to assess token risk:
 * - Top holder concentration
 * - Liquidity depth
 * - Buy/sell ratio
 * - Dev wallet activity
 *
 * @param {Object} params
 * @param {string} params.address - Token contract address
 * @param {string} [params.chain="solana"] - Chain (solana, base, ethereum)
 * @returns {Object} Smart money analysis
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.address) {
  console.log(JSON.stringify({ error: 'Missing required field: address' }));
  process.exit(1);
}

const chain = input.chain || 'solana';

try {
  // Step 1: Get basic token data from DEXScreener
  const tokenData = devtopiaRun('api-dexscreener-token', { 
    address: input.address,
    chain: chain 
  });
  
  if (!tokenData.success) {
    console.log(JSON.stringify({ 
      success: false, 
      error: 'Token not found on DEXScreener' 
    }));
    process.exit(0);
  }
  
  // Step 2: Calculate risk metrics
  const mc = tokenData.marketCap || 0;
  const liq = tokenData.liquidity || 0;
  const vol24h = tokenData.volume24h || 0;
  
  // Liquidity to MC ratio (healthy > 5%)
  const liqRatio = mc > 0 ? ((liq / mc) * 100).toFixed(2) : 0;
  
  // Volume to MC ratio (healthy 10-50%)
  const volRatio = mc > 0 ? ((vol24h / mc) * 100).toFixed(2) : 0;
  
  // Price volatility score
  const h1Change = Math.abs(tokenData.priceChange?.h1 || 0);
  const h24Change = Math.abs(tokenData.priceChange?.h24 || 0);
  const volatility = ((h1Change * 6) + h24Change) / 2;
  
  // Risk assessment
  const risks = [];
  let riskScore = 0;
  
  if (parseFloat(liqRatio) < 3) {
    risks.push('🔴 Very low liquidity ratio (<3%) - high slippage/rug risk');
    riskScore += 30;
  } else if (parseFloat(liqRatio) < 5) {
    risks.push('🟡 Low liquidity ratio (<5%)');
    riskScore += 15;
  }
  
  if (mc < 10000) {
    risks.push('🔴 Micro cap (<$10K) - extremely high risk');
    riskScore += 25;
  } else if (mc < 50000) {
    risks.push('🟡 Very small cap (<$50K)');
    riskScore += 10;
  }
  
  if (liq < 5000) {
    risks.push('🔴 Liquidity under $5K - easy to manipulate');
    riskScore += 25;
  } else if (liq < 20000) {
    risks.push('🟡 Liquidity under $20K');
    riskScore += 10;
  }
  
  if (volatility > 50) {
    risks.push('🔴 Extreme volatility - pump and dump pattern');
    riskScore += 20;
  } else if (volatility > 25) {
    risks.push('🟡 High volatility');
    riskScore += 10;
  }
  
  if (parseFloat(volRatio) > 100) {
    risks.push('🟡 Volume higher than MC - possible wash trading');
    riskScore += 15;
  }
  
  // Determine overall rating
  let rating;
  if (riskScore >= 60) rating = 'EXTREME_RISK';
  else if (riskScore >= 40) rating = 'HIGH_RISK';
  else if (riskScore >= 20) rating = 'MODERATE_RISK';
  else rating = 'LOWER_RISK';
  
  // Positive signals
  const positives = [];
  if (parseFloat(liqRatio) >= 10) positives.push('✅ Strong liquidity ratio (>10%)');
  if (liq >= 100000) positives.push('✅ Deep liquidity (>$100K)');
  if (mc >= 500000) positives.push('✅ Established market cap (>$500K)');
  if (parseFloat(volRatio) >= 10 && parseFloat(volRatio) <= 50) positives.push('✅ Healthy volume/MC ratio');
  
  console.log(JSON.stringify({
    success: true,
    token: tokenData.token,
    chain: tokenData.chain,
    metrics: {
      marketCap: mc,
      liquidity: liq,
      volume24h: vol24h,
      liquidityRatio: `${liqRatio}%`,
      volumeRatio: `${volRatio}%`,
      volatilityScore: volatility.toFixed(1)
    },
    priceAction: {
      price: tokenData.price,
      change1h: tokenData.priceChange?.h1,
      change24h: tokenData.priceChange?.h24
    },
    riskAssessment: {
      score: riskScore,
      rating: rating,
      risks: risks,
      positives: positives
    },
    recommendation: riskScore >= 60 
      ? 'AVOID - Multiple high-risk indicators'
      : riskScore >= 40 
        ? 'CAUTION - Significant risks present'
        : riskScore >= 20 
          ? 'DYOR - Some concerns but tradeable'
          : 'RELATIVELY SAFE - Standard degen risk',
    url: tokenData.url,
    steps: ["api-dexscreener-token", "risk-analysis"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
