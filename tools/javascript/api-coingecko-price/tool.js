/**
 * api-coingecko-price - Fetch token price from CoinGecko
 * Builds on: api-request-json
 *
 * Get current price, market cap, volume, and 24h change for any token.
 * Supports lookup by CoinGecko ID or contract address.
 *
 * @param {Object} params
 * @param {string} [params.id] - CoinGecko coin ID (e.g., "bitcoin", "ethereum")
 * @param {string} [params.address] - Contract address (requires platform param)
 * @param {string} [params.platform] - Platform for address lookup (ethereum, base, solana, etc)
 * @param {string} [params.currency="usd"] - Currency for price (usd, eur, btc, eth)
 * @returns {Object} Token price data
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.id && !input.address) {
  console.log(JSON.stringify({ error: 'Missing required field: id or address' }));
  process.exit(1);
}

if (input.address && !input.platform) {
  console.log(JSON.stringify({ error: 'address requires platform parameter' }));
  process.exit(1);
}

const currency = input.currency || 'usd';

try {
  let url;
  
  if (input.id) {
    // Lookup by CoinGecko ID
    url = `https://api.coingecko.com/api/v3/coins/${input.id}?localization=false&tickers=false&community_data=false&developer_data=false`;
  } else {
    // Lookup by contract address
    url = `https://api.coingecko.com/api/v3/coins/${input.platform}/contract/${input.address}`;
  }
  
  const response = devtopiaRun('api-request-json', { url });
  
  if (!response.data || response.data.error) {
    console.log(JSON.stringify({ 
      success: false, 
      error: response.data?.error || 'Token not found' 
    }));
    process.exit(0);
  }
  
  const coin = response.data;
  const marketData = coin.market_data || {};
  
  console.log(JSON.stringify({
    success: true,
    token: {
      id: coin.id,
      symbol: coin.symbol?.toUpperCase(),
      name: coin.name,
      image: coin.image?.small
    },
    price: marketData.current_price?.[currency],
    marketCap: marketData.market_cap?.[currency],
    marketCapRank: marketData.market_cap_rank,
    volume24h: marketData.total_volume?.[currency],
    priceChange: {
      h24: marketData.price_change_percentage_24h,
      d7: marketData.price_change_percentage_7d,
      d30: marketData.price_change_percentage_30d
    },
    ath: marketData.ath?.[currency],
    athDate: marketData.ath_date?.[currency],
    athChange: marketData.ath_change_percentage?.[currency],
    circulatingSupply: marketData.circulating_supply,
    totalSupply: marketData.total_supply,
    currency: currency,
    lastUpdated: coin.last_updated,
    steps: ["api-request-json"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
