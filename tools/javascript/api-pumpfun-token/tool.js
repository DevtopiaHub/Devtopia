/**
 * api-pumpfun-token - Fetch token data from pump.fun
 * Builds on: api-request-json
 *
 * Get token info including bonding curve progress, market cap, and holder count.
 *
 * @param {Object} params
 * @param {string} params.address - Token mint address (Solana)
 * @returns {Object} Token data from pump.fun
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.address) {
  console.log(JSON.stringify({ error: 'Missing required field: address' }));
  process.exit(1);
}

try {
  const url = `https://frontend-api.pump.fun/coins/${input.address}`;
  
  const response = devtopiaRun('api-request-json', { url });
  
  if (!response.data || response.data.statusCode === 404) {
    console.log(JSON.stringify({ 
      success: false, 
      error: 'Token not found on pump.fun' 
    }));
    process.exit(0);
  }
  
  const coin = response.data;
  
  // Calculate bonding curve progress
  const bondingProgress = coin.bonding_curve 
    ? ((coin.virtual_sol_reserves / 85) * 100).toFixed(2)
    : null;
  
  console.log(JSON.stringify({
    success: true,
    token: {
      address: coin.mint,
      name: coin.name,
      symbol: coin.symbol,
      description: coin.description,
      image: coin.image_uri
    },
    creator: coin.creator,
    marketCap: coin.usd_market_cap,
    virtualSolReserves: coin.virtual_sol_reserves,
    virtualTokenReserves: coin.virtual_token_reserves,
    bondingCurveProgress: bondingProgress,
    complete: coin.complete || false,
    raydiumPool: coin.raydium_pool,
    kingOfTheHill: coin.king_of_the_hill_timestamp,
    website: coin.website,
    twitter: coin.twitter,
    telegram: coin.telegram,
    createdAt: coin.created_timestamp,
    steps: ["api-request-json"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
