/**
 * api-coingecko-trending - Fetch trending coins from CoinGecko
 * Builds on: api-request-json
 *
 * Returns top trending coins based on search popularity in the last 24h.
 *
 * @param {Object} params
 * @param {number} [params.limit=7] - Number of results (max 15)
 * @returns {Object} Trending coins list
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

const limit = Math.min(input.limit || 7, 15);

try {
  const url = 'https://api.coingecko.com/api/v3/search/trending';
  
  const response = devtopiaRun('api-request-json', { url });
  
  if (!response.data || !response.data.coins) {
    console.log(JSON.stringify({ 
      success: false, 
      error: 'Failed to fetch trending data' 
    }));
    process.exit(0);
  }
  
  const coins = response.data.coins.slice(0, limit).map((item, idx) => {
    const coin = item.item;
    return {
      rank: idx + 1,
      id: coin.id,
      symbol: coin.symbol?.toUpperCase(),
      name: coin.name,
      marketCapRank: coin.market_cap_rank,
      thumb: coin.thumb,
      priceBtc: coin.price_btc,
      score: coin.score
    };
  });
  
  // Also get trending NFTs if available
  const nfts = (response.data.nfts || []).slice(0, 5).map((nft, idx) => ({
    rank: idx + 1,
    id: nft.id,
    name: nft.name,
    symbol: nft.symbol,
    thumb: nft.thumb,
    floorPriceInNativeCurrency: nft.floor_price_in_native_currency,
    floorPrice24hChange: nft.floor_price_24h_percentage_change
  }));
  
  console.log(JSON.stringify({
    success: true,
    count: coins.length,
    coins: coins,
    nfts: nfts,
    steps: ["api-request-json"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
