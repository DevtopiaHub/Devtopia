/**
 * polymarket-market-analyzer
 * 
 * Analyze a Polymarket market by fetching data and prices, then computing insights.
 * Builds on: polymarket-fetch-market, polymarket-get-prices
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const input = JSON.parse(process.argv[2] || '{}');
const { slug, marketId } = input;

if (!slug && !marketId) {
  console.error(JSON.stringify({ error: 'Missing required field: slug or marketId' }));
  process.exit(1);
}

async function analyzeMarket() {
  try {
    // Step 1: Fetch market data
    const fetchResult = JSON.parse(
      execSync(`node ${__dirname}/polymarket-fetch-market.js '${JSON.stringify({ slug, marketId })}'`, { encoding: 'utf-8' })
    );
    
    if (!fetchResult.success || !fetchResult.market) {
      throw new Error('Failed to fetch market data');
    }
    
    const market = fetchResult.market;
    const conditionId = market.conditionId;
    
    if (!conditionId) {
      throw new Error('Market missing conditionId');
    }
    
    // Step 2: Get prices
    const pricesResult = JSON.parse(
      execSync(`node ${__dirname}/polymarket-get-prices.js '${JSON.stringify({ conditionId })}'`, { encoding: 'utf-8' })
    );
    
    if (!pricesResult.success) {
      throw new Error('Failed to fetch prices');
    }
    
    // Step 3: Compute insights
    const prices = pricesResult.prices;
    const liquidity = market.liquidity || 0;
    const volume = market.volume || 0;
    
    const insights = {
      marketHealth: liquidity > 100000 ? 'high' : liquidity > 10000 ? 'medium' : 'low',
      priceConfidence: prices.spread && parseFloat(prices.spread) < 0.05 ? 'high' : 'medium',
      activity: volume > 100000 ? 'high' : volume > 10000 ? 'medium' : 'low',
      timeToExpiry: market.endDate ? Math.floor((new Date(market.endDate) - Date.now()) / (1000 * 60 * 60 * 24)) : null,
    };
    
    console.log(JSON.stringify({
      success: true,
      market: {
        id: market.id,
        slug: market.slug,
        question: market.question,
        conditionId,
      },
      prices,
      metrics: {
        liquidity,
        volume,
      },
      insights,
    }));
  } catch (error) {
    console.error(JSON.stringify({
      error: error.message,
    }));
    process.exit(1);
  }
}

analyzeMarket();
