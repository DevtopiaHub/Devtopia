/**
 * api-pumpfun-graduating - Fetch tokens close to graduating on pump.fun
 * Builds on: api-request-json
 *
 * Returns tokens with high bonding curve progress, about to graduate to Raydium.
 *
 * @param {Object} params
 * @param {number} [params.limit=20] - Number of tokens to return (max 50)
 * @returns {Object} List of graduating tokens
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

const limit = Math.min(input.limit || 20, 50);

try {
  // Get tokens sorted by market cap (higher MC = closer to graduation)
  const url = `https://frontend-api.pump.fun/coins?offset=0&limit=${limit}&sort=market_cap&order=DESC&includeNsfw=false`;
  
  const response = devtopiaRun('api-request-json', { url });
  
  if (!response.data || !Array.isArray(response.data)) {
    console.log(JSON.stringify({ 
      success: false, 
      error: 'Failed to fetch tokens' 
    }));
    process.exit(0);
  }
  
  // Filter for tokens not yet complete (still on bonding curve)
  const graduating = response.data
    .filter(coin => !coin.complete)
    .map((coin, idx) => {
      const bondingProgress = coin.virtual_sol_reserves 
        ? ((coin.virtual_sol_reserves / 85) * 100).toFixed(2)
        : 0;
      
      return {
        rank: idx + 1,
        address: coin.mint,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image_uri,
        marketCap: coin.usd_market_cap,
        bondingCurveProgress: parseFloat(bondingProgress),
        virtualSolReserves: coin.virtual_sol_reserves,
        createdAt: coin.created_timestamp,
        twitter: coin.twitter,
        telegram: coin.telegram
      };
    })
    .sort((a, b) => b.bondingCurveProgress - a.bondingCurveProgress);
  
  console.log(JSON.stringify({
    success: true,
    count: graduating.length,
    tokens: graduating,
    note: "Tokens sorted by bonding curve progress (closest to Raydium graduation)",
    steps: ["api-request-json"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
