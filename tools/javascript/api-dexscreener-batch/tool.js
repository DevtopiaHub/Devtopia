/**
 * api-dexscreener-batch - Fetch multiple tokens in parallel from DEXScreener
 * Builds on: api-dexscreener-token
 *
 * Fetches data for multiple tokens and returns a summary with
 * optional sorting by market cap, volume, or price change.
 *
 * @param {Object} params
 * @param {string[]} params.addresses - Array of token contract addresses
 * @param {string} [params.sortBy] - Sort by: marketCap, volume24h, priceChangeH1, priceChangeH24
 * @param {string} [params.sortOrder="desc"] - Sort order: asc, desc
 * @param {string} [params.chain] - Optional chain filter for all tokens
 * @returns {Object} Batch token data
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.addresses || !Array.isArray(input.addresses) || input.addresses.length === 0) {
  console.log(JSON.stringify({ error: 'Missing required field: addresses (array of token addresses)' }));
  process.exit(1);
}

if (input.addresses.length > 20) {
  console.log(JSON.stringify({ error: 'Maximum 20 tokens per batch' }));
  process.exit(1);
}

const sortBy = input.sortBy || null;
const sortOrder = input.sortOrder || 'desc';

try {
  const results = [];
  const errors = [];
  
  // Fetch each token
  for (const address of input.addresses) {
    try {
      const tokenData = devtopiaRun('api-dexscreener-token', { 
        address: address,
        chain: input.chain 
      });
      
      if (tokenData.success) {
        results.push({
          address: address,
          symbol: tokenData.token.symbol,
          name: tokenData.token.name,
          chain: tokenData.chain,
          price: parseFloat(tokenData.price) || 0,
          marketCap: tokenData.marketCap || 0,
          volume24h: tokenData.volume24h || 0,
          liquidity: tokenData.liquidity || 0,
          priceChangeH1: tokenData.priceChange?.h1 || 0,
          priceChangeH24: tokenData.priceChange?.h24 || 0,
          url: tokenData.url
        });
      } else {
        errors.push({ address, error: tokenData.error || 'Not found' });
      }
    } catch (e) {
      errors.push({ address, error: e.message });
    }
  }
  
  // Sort if requested
  if (sortBy && results.length > 0) {
    const sortKey = {
      'marketCap': 'marketCap',
      'volume24h': 'volume24h',
      'priceChangeH1': 'priceChangeH1',
      'priceChangeH24': 'priceChangeH24',
      'liquidity': 'liquidity'
    }[sortBy];
    
    if (sortKey) {
      results.sort((a, b) => {
        const diff = (b[sortKey] || 0) - (a[sortKey] || 0);
        return sortOrder === 'asc' ? -diff : diff;
      });
    }
  }
  
  // Calculate totals
  const totalMarketCap = results.reduce((sum, t) => sum + (t.marketCap || 0), 0);
  const totalVolume = results.reduce((sum, t) => sum + (t.volume24h || 0), 0);
  
  console.log(JSON.stringify({
    success: true,
    count: results.length,
    errors: errors.length,
    summary: {
      totalMarketCap,
      totalVolume,
      avgPriceChangeH1: results.length > 0 
        ? results.reduce((sum, t) => sum + t.priceChangeH1, 0) / results.length 
        : 0,
      avgPriceChangeH24: results.length > 0 
        ? results.reduce((sum, t) => sum + t.priceChangeH24, 0) / results.length 
        : 0
    },
    tokens: results,
    failed: errors,
    steps: ["api-dexscreener-token"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
