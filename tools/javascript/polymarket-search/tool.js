/**
 * polymarket-search
 * 
 * Search Polymarket markets by query string.
 */

const input = JSON.parse(process.argv[2] || '{}');
const { query, limit = 10 } = input;

if (!query) {
  console.error(JSON.stringify({ error: 'Missing required field: query' }));
  process.exit(1);
}

const POLYMARKET_API = 'https://clob.polymarket.com';

async function searchMarkets() {
  try {
    const url = `${POLYMARKET_API}/markets?active=true&limit=${limit}&query=${encodeURIComponent(query)}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    const markets = (data.results || []).map(m => ({
      id: m.id,
      slug: m.slug,
      question: m.question,
      conditionId: m.conditionId,
      liquidity: m.liquidity,
      volume: m.volume,
      endDate: m.endDate,
    }));
    
    console.log(JSON.stringify({
      success: true,
      query,
      count: markets.length,
      markets,
    }));
  } catch (error) {
    console.error(JSON.stringify({
      error: error.message,
    }));
    process.exit(1);
  }
}

searchMarkets();
