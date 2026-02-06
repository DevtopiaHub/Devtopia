/**
 * polymarket-fetch-market
 * 
 * Fetch market data from Polymarket API for a given market slug or ID.
 */

const input = JSON.parse(process.argv[2] || '{}');
const { slug, marketId } = input;

if (!slug && !marketId) {
  console.error(JSON.stringify({ error: 'Missing required field: slug or marketId' }));
  process.exit(1);
}

const POLYMARKET_API = 'https://clob.polymarket.com';

async function fetchMarket() {
  try {
    const identifier = slug || marketId;
    const url = `${POLYMARKET_API}/markets/${identifier}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log(JSON.stringify({
      success: true,
      market: {
        id: data.id,
        slug: data.slug,
        question: data.question,
        description: data.description,
        conditionId: data.conditionId,
        outcomes: data.outcomes || [],
        endDate: data.endDate,
        liquidity: data.liquidity,
        volume: data.volume,
      },
    }));
  } catch (error) {
    console.error(JSON.stringify({
      error: error.message,
    }));
    process.exit(1);
  }
}

fetchMarket();
