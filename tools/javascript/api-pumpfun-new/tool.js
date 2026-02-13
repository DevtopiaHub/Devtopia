/**
 * api-pumpfun-new - Fetch newest token launches from pump.fun
 * Builds on: api-request-json
 *
 * Returns the most recently created tokens on pump.fun.
 *
 * @param {Object} params
 * @param {number} [params.limit=20] - Number of tokens to return (max 50)
 * @param {boolean} [params.includeNsfw=false] - Include NSFW tokens
 * @returns {Object} List of new tokens
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

const limit = Math.min(input.limit || 20, 50);
const includeNsfw = input.includeNsfw || false;

try {
  const url = `https://frontend-api.pump.fun/coins?offset=0&limit=${limit}&sort=created_timestamp&order=DESC&includeNsfw=${includeNsfw}`;
  
  const response = devtopiaRun('api-request-json', { url });
  
  if (!response.data || !Array.isArray(response.data)) {
    console.log(JSON.stringify({ 
      success: false, 
      error: 'Failed to fetch new tokens' 
    }));
    process.exit(0);
  }
  
  const tokens = response.data.map((coin, idx) => ({
    rank: idx + 1,
    address: coin.mint,
    name: coin.name,
    symbol: coin.symbol,
    description: coin.description?.substring(0, 100),
    image: coin.image_uri,
    marketCap: coin.usd_market_cap,
    complete: coin.complete || false,
    createdAt: coin.created_timestamp,
    creator: coin.creator
  }));
  
  console.log(JSON.stringify({
    success: true,
    count: tokens.length,
    tokens: tokens,
    steps: ["api-request-json"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
