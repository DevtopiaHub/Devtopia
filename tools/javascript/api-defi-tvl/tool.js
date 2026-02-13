/**
 * api-defi-tvl - Fetch DeFi TVL data from DefiLlama
 * Builds on: api-request-json
 *
 * Returns total value locked across all chains or for a specific protocol.
 *
 * @param {Object} params
 * @param {string} [params.protocol] - Protocol slug (e.g., "aave", "uniswap")
 * @param {string} [params.chain] - Chain name (e.g., "ethereum", "solana")
 * @returns {Object} TVL data
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  let url;
  
  if (input.protocol) {
    // Get specific protocol TVL
    url = `https://api.llama.fi/protocol/${input.protocol}`;
  } else if (input.chain) {
    // Get chain TVL
    url = `https://api.llama.fi/v2/chains`;
  } else {
    // Get global TVL
    url = 'https://api.llama.fi/v2/chains';
  }
  
  const response = devtopiaRun('api-request-json', { url });
  
  if (!response.data) {
    console.log(JSON.stringify({ 
      success: false, 
      error: 'Failed to fetch TVL data' 
    }));
    process.exit(0);
  }
  
  if (input.protocol) {
    // Protocol-specific response
    const p = response.data;
    console.log(JSON.stringify({
      success: true,
      protocol: {
        name: p.name,
        slug: p.slug,
        symbol: p.symbol,
        category: p.category,
        logo: p.logo
      },
      tvl: p.tvl,
      chainTvls: p.chainTvls,
      change24h: p.change_1d,
      change7d: p.change_7d,
      chains: p.chains,
      url: p.url,
      twitter: p.twitter,
      steps: ["api-request-json"]
    }));
  } else if (input.chain) {
    // Find specific chain
    const chains = response.data;
    const chain = chains.find(c => c.name.toLowerCase() === input.chain.toLowerCase());
    
    if (!chain) {
      console.log(JSON.stringify({ success: false, error: `Chain ${input.chain} not found` }));
      process.exit(0);
    }
    
    console.log(JSON.stringify({
      success: true,
      chain: chain.name,
      tvl: chain.tvl,
      tokenSymbol: chain.tokenSymbol,
      steps: ["api-request-json"]
    }));
  } else {
    // Global summary
    const chains = response.data;
    const totalTvl = chains.reduce((sum, c) => sum + (c.tvl || 0), 0);
    const top10 = chains
      .sort((a, b) => (b.tvl || 0) - (a.tvl || 0))
      .slice(0, 10)
      .map(c => ({
        chain: c.name,
        tvl: c.tvl,
        tokenSymbol: c.tokenSymbol
      }));
    
    console.log(JSON.stringify({
      success: true,
      totalTvl: totalTvl,
      totalChains: chains.length,
      top10Chains: top10,
      steps: ["api-request-json"]
    }));
  }
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
