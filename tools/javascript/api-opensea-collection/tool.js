/**
 * api-opensea-collection - Fetch NFT collection data from OpenSea
 * Builds on: api-request-json
 *
 * Returns floor price, volume, and stats for any NFT collection.
 *
 * @param {Object} params
 * @param {string} params.slug - OpenSea collection slug (e.g., "boredapeyachtclub")
 * @returns {Object} Collection data
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.slug) {
  console.log(JSON.stringify({ error: 'Missing required field: slug' }));
  process.exit(1);
}

try {
  const url = `https://api.opensea.io/api/v2/collections/${input.slug}`;
  
  const response = devtopiaRun('api-request-json', { 
    url,
    headers: {
      'Accept': 'application/json'
    }
  });
  
  if (!response.data || response.data.errors) {
    console.log(JSON.stringify({ 
      success: false, 
      error: response.data?.errors?.[0] || 'Collection not found' 
    }));
    process.exit(0);
  }
  
  const c = response.data;
  
  console.log(JSON.stringify({
    success: true,
    collection: {
      name: c.name,
      slug: c.collection,
      description: c.description?.substring(0, 200),
      image: c.image_url,
      banner: c.banner_image_url
    },
    stats: {
      totalSupply: c.total_supply,
      numOwners: c.num_owners,
      floorPrice: c.floor_price,
      totalVolume: c.total_volume
    },
    contracts: c.contracts?.map(contract => ({
      address: contract.address,
      chain: contract.chain
    })),
    links: {
      opensea: `https://opensea.io/collection/${input.slug}`,
      website: c.project_url,
      discord: c.discord_url,
      twitter: c.twitter_username ? `https://twitter.com/${c.twitter_username}` : null
    },
    createdAt: c.created_date,
    steps: ["api-request-json"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
