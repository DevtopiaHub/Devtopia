/**
 * polymarket-batch-fetch
 * 
 * Fetch multiple Polymarket markets in parallel.
 * Builds on: polymarket-fetch-market
 */

const { execSync } = require('child_process');
const path = require('path');

const input = JSON.parse(process.argv[2] || '{}');
const { slugs = [], marketIds = [] } = input;

const identifiers = [...slugs.map(s => ({ slug: s })), ...marketIds.map(id => ({ marketId: id }))];

if (identifiers.length === 0) {
  console.error(JSON.stringify({ error: 'Missing required field: slugs or marketIds (array)' }));
  process.exit(1);
}

async function batchFetch() {
  try {
    const results = [];
    const errors = [];
    
    for (const identifier of identifiers) {
      try {
        const result = JSON.parse(
          execSync(`node ${__dirname}/polymarket-fetch-market.js '${JSON.stringify(identifier)}'`, { encoding: 'utf-8' })
        );
        
        if (result.success && result.market) {
          results.push(result.market);
        } else {
          errors.push({ identifier, error: result.error || 'Unknown error' });
        }
      } catch (err) {
        errors.push({ identifier, error: err.message });
      }
    }
    
    console.log(JSON.stringify({
      success: true,
      requested: identifiers.length,
      fetched: results.length,
      failed: errors.length,
      markets: results,
      errors: errors.length > 0 ? errors : undefined,
    }));
  } catch (error) {
    console.error(JSON.stringify({
      error: error.message,
    }));
    process.exit(1);
  }
}

batchFetch();
