/**
 * api-dexscreener-trending - Fetch trending tokens from DEXScreener
 * Builds on: api-request-json
 *
 * Returns the current trending tokens across all chains or filtered by chain.
 *
 * @param {Object} params
 * @param {string} [params.chain] - Optional chain filter (ethereum, base, solana, etc)
 * @param {number} [params.limit=10] - Number of results (max 50)
 * @returns {Object} Trending tokens list
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

const limit = Math.min(input.limit || 10, 50);

try {
  // DEXScreener boosted/trending endpoint
  const url = 'https://api.dexscreener.com/token-boosts/top/v1';
  
  const response = devtopiaRun('api-request-json', { url });
  
  if (!response.data || !Array.isArray(response.data)) {
    console.log(JSON.stringify({ 
      success: false, 
      error: 'Failed to fetch trending data' 
    }));
    process.exit(0);
  }
  
  let tokens = response.data;
  
  // Filter by chain if specified
  if (input.chain) {
    tokens = tokens.filter(t => t.chainId === input.chain);
  }
  
  // Limit results
  tokens = tokens.slice(0, limit);
  
  // Format output
  const formatted = tokens.map((t, idx) => ({
    rank: idx + 1,
    chain: t.chainId,
    address: t.tokenAddress,
    url: t.url,
    description: t.description || null,
    links: t.links || []
  }));
  
  console.log(JSON.stringify({
    success: true,
    count: formatted.length,
    chain: input.chain || 'all',
    tokens: formatted,
    steps: ["api-request-json"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
