/**
 * dex-token-lookup - Fetch token data from DEXScreener API
 * Builds on: api-request-json (via devtopia-runtime)
 *
 * Returns price, market cap, volume, and liquidity for any token
 * on any chain supported by DEXScreener.
 *
 * @param {Object} params
 * @param {string} params.address - Token contract address
 * @param {string} [params.chain] - Optional chain filter (ethereum, base, solana, etc)
 * @returns {Object} Token data with price, mcap, volume, liquidity
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.address) {
  console.log(JSON.stringify({ error: 'Missing required field: address' }));
  process.exit(1);
}

try {
  const url = `https://api.dexscreener.com/latest/dex/tokens/${input.address}`;
  
  const response = devtopiaRun('api-request-json', { url });
  
  if (!response.data || !response.data.pairs || response.data.pairs.length === 0) {
    console.log(JSON.stringify({ 
      success: false, 
      error: 'Token not found or no trading pairs' 
    }));
    process.exit(0);
  }
  
  let pairs = response.data.pairs;
  
  // Filter by chain if specified
  if (input.chain) {
    pairs = pairs.filter(p => p.chainId === input.chain);
  }
  
  // Get the best pair (highest liquidity)
  const bestPair = pairs.sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0];
  
  console.log(JSON.stringify({
    success: true,
    token: {
      name: bestPair.baseToken?.name || 'Unknown',
      symbol: bestPair.baseToken?.symbol || 'Unknown',
      address: bestPair.baseToken?.address || input.address,
    },
    chain: bestPair.chainId,
    dex: bestPair.dexId,
    price: bestPair.priceUsd,
    priceNative: bestPair.priceNative,
    marketCap: bestPair.marketCap || bestPair.fdv,
    liquidity: bestPair.liquidity?.usd,
    volume24h: bestPair.volume?.h24,
    priceChange: {
      m5: bestPair.priceChange?.m5,
      h1: bestPair.priceChange?.h1,
      h6: bestPair.priceChange?.h6,
      h24: bestPair.priceChange?.h24,
    },
    txns24h: bestPair.txns?.h24,
    pairAddress: bestPair.pairAddress,
    url: bestPair.url,
    pairsCount: pairs.length,
    steps: ["api-request-json"],
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
