/**
 * api-token-price-alert - Monitor token price and send Discord alert on threshold
 * Builds on: api-dexscreener-token, social-discord-webhook
 *
 * Fetches current token data and sends a Discord alert if price change
 * exceeds the specified threshold.
 *
 * @param {Object} params
 * @param {string} params.address - Token contract address
 * @param {string} params.webhookUrl - Discord webhook URL
 * @param {number} [params.threshold=15] - Price change % threshold to trigger alert
 * @param {string} [params.timeframe="h1"] - Timeframe: m5, h1, h6, h24
 * @param {string} [params.chain] - Optional chain filter
 * @returns {Object} Alert result
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.address) {
  console.log(JSON.stringify({ error: 'Missing required field: address' }));
  process.exit(1);
}

if (!input.webhookUrl) {
  console.log(JSON.stringify({ error: 'Missing required field: webhookUrl' }));
  process.exit(1);
}

const threshold = input.threshold || 15;
const timeframe = input.timeframe || 'h1';

try {
  // Step 1: Fetch token data
  const tokenData = devtopiaRun('api-dexscreener-token', { 
    address: input.address,
    chain: input.chain 
  });
  
  if (!tokenData.success) {
    console.log(JSON.stringify({ 
      success: false, 
      error: tokenData.error || 'Failed to fetch token data',
      alerted: false
    }));
    process.exit(0);
  }
  
  const priceChange = tokenData.priceChange[timeframe];
  const shouldAlert = Math.abs(priceChange || 0) >= threshold;
  
  if (shouldAlert) {
    const direction = priceChange > 0 ? '🟢 PUMP' : '🔴 DUMP';
    const emoji = priceChange > 0 ? '🚀' : '📉';
    
    const message = `${direction} ${emoji}\n\n` +
      `**${tokenData.token.symbol}** (${tokenData.token.name})\n` +
      `Chain: ${tokenData.chain}\n\n` +
      `💰 Price: $${tokenData.price}\n` +
      `📊 MC: $${Number(tokenData.marketCap).toLocaleString()}\n` +
      `📈 ${timeframe.toUpperCase()}: ${priceChange > 0 ? '+' : ''}${priceChange}%\n` +
      `💧 Liquidity: $${Number(tokenData.liquidity).toLocaleString()}\n` +
      `📦 Volume 24h: $${Number(tokenData.volume24h).toLocaleString()}\n\n` +
      `🔗 ${tokenData.url}`;
    
    // Step 2: Send Discord alert
    devtopiaRun('social-discord-webhook', {
      webhookUrl: input.webhookUrl,
      content: message
    });
    
    console.log(JSON.stringify({
      success: true,
      alerted: true,
      token: tokenData.token.symbol,
      priceChange: priceChange,
      threshold: threshold,
      timeframe: timeframe,
      direction: priceChange > 0 ? 'up' : 'down',
      steps: ["api-dexscreener-token", "social-discord-webhook"]
    }));
  } else {
    console.log(JSON.stringify({
      success: true,
      alerted: false,
      token: tokenData.token.symbol,
      priceChange: priceChange,
      threshold: threshold,
      timeframe: timeframe,
      reason: `Price change (${priceChange}%) below threshold (${threshold}%)`,
      steps: ["api-dexscreener-token"]
    }));
  }
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
