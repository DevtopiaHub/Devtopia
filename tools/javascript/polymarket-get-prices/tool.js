/**
 * polymarket-get-prices
 * 
 * Get current prices for a Polymarket market condition.
 */

const input = JSON.parse(process.argv[2] || '{}');
const { conditionId } = input;

if (!conditionId) {
  console.error(JSON.stringify({ error: 'Missing required field: conditionId' }));
  process.exit(1);
}

const POLYMARKET_API = 'https://clob.polymarket.com';

async function getPrices() {
  try {
    const url = `${POLYMARKET_API}/book?token_id=${conditionId}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract best bid/ask prices
    const bids = data.bids || [];
    const asks = data.asks || [];
    
    const bestBid = bids.length > 0 ? parseFloat(bids[0].price) : null;
    const bestAsk = asks.length > 0 ? parseFloat(asks[0].price) : null;
    const midPrice = bestBid && bestAsk ? ((bestBid + bestAsk) / 2).toFixed(4) : null;
    
    console.log(JSON.stringify({
      success: true,
      conditionId,
      prices: {
        bestBid,
        bestAsk,
        midPrice: midPrice ? parseFloat(midPrice) : null,
        spread: bestBid && bestAsk ? (bestAsk - bestBid).toFixed(4) : null,
      },
      depth: {
        bids: bids.length,
        asks: asks.length,
      },
    }));
  } catch (error) {
    console.error(JSON.stringify({
      error: error.message,
    }));
    process.exit(1);
  }
}

getPrices();
