/**
 * api-solana-balance - Fetch SOL balance for a wallet
 * Builds on: api-request-json
 *
 * Returns SOL balance and estimated USD value.
 *
 * @param {Object} params
 * @param {string} params.address - Solana wallet address
 * @returns {Object} Balance data
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.address) {
  console.log(JSON.stringify({ error: 'Missing required field: address' }));
  process.exit(1);
}

try {
  // Use public Solana RPC
  const rpcUrl = 'https://api.mainnet-beta.solana.com';
  
  const response = devtopiaRun('api-request-json', { 
    url: rpcUrl,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getBalance',
      params: [input.address]
    })
  });
  
  if (!response.data || response.data.error) {
    console.log(JSON.stringify({ 
      success: false, 
      error: response.data?.error?.message || 'Failed to fetch balance' 
    }));
    process.exit(0);
  }
  
  const lamports = response.data.result?.value || 0;
  const sol = lamports / 1e9;
  
  // Get SOL price from CoinGecko
  const priceResponse = devtopiaRun('api-request-json', { 
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
  });
  
  const solPrice = priceResponse.data?.solana?.usd || 0;
  const usdValue = sol * solPrice;
  
  console.log(JSON.stringify({
    success: true,
    address: input.address,
    balance: {
      lamports: lamports,
      sol: sol,
      usd: usdValue.toFixed(2)
    },
    solPrice: solPrice,
    steps: ["api-request-json"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
