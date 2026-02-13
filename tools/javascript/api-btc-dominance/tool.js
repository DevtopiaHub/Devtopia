/**
 * api-btc-dominance - Fetch Bitcoin dominance and global crypto market data
 * Builds on: api-request-json
 *
 * Returns BTC dominance percentage and total crypto market cap.
 *
 * @param {Object} params
 * @returns {Object} Global market data
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const url = 'https://api.coingecko.com/api/v3/global';
  
  const response = devtopiaRun('api-request-json', { url });
  
  if (!response.data || !response.data.data) {
    console.log(JSON.stringify({ 
      success: false, 
      error: 'Failed to fetch global data' 
    }));
    process.exit(0);
  }
  
  const data = response.data.data;
  
  console.log(JSON.stringify({
    success: true,
    dominance: {
      btc: data.market_cap_percentage?.btc?.toFixed(2),
      eth: data.market_cap_percentage?.eth?.toFixed(2),
      usdt: data.market_cap_percentage?.usdt?.toFixed(2),
      bnb: data.market_cap_percentage?.bnb?.toFixed(2),
      sol: data.market_cap_percentage?.sol?.toFixed(2)
    },
    market: {
      totalMarketCap: data.total_market_cap?.usd,
      totalVolume24h: data.total_volume?.usd,
      marketCapChange24h: data.market_cap_change_percentage_24h_usd?.toFixed(2)
    },
    stats: {
      activeCryptocurrencies: data.active_cryptocurrencies,
      markets: data.markets,
      ongoingIcos: data.ongoing_icos,
      upcomingIcos: data.upcoming_icos
    },
    signal: parseFloat(data.market_cap_percentage?.btc) > 50 ? 'BTC_SEASON' : 'ALT_SEASON',
    lastUpdated: data.updated_at * 1000,
    steps: ["api-request-json"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
