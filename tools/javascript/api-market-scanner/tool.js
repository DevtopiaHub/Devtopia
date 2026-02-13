/**
 * api-market-scanner - Comprehensive market overview combining multiple indicators
 * Builds on: api-fear-greed, api-btc-dominance, api-coingecko-trending, api-eth-gas
 *
 * One-shot market health check that combines:
 * - Fear & Greed Index
 * - BTC Dominance (alt season indicator)
 * - ETH gas prices
 * - Trending coins
 *
 * @param {Object} params
 * @returns {Object} Complete market overview
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  // Parallel fetch all market indicators
  const fearGreed = devtopiaRun('api-fear-greed', {});
  const dominance = devtopiaRun('api-btc-dominance', {});
  const trending = devtopiaRun('api-coingecko-trending', { limit: 5 });
  const gas = devtopiaRun('api-eth-gas', {});
  
  // Aggregate signals
  const signals = [];
  let bullishScore = 0;
  
  // Fear & Greed signal
  if (fearGreed.success) {
    const fgValue = fearGreed.current?.value || 50;
    if (fgValue <= 25) {
      signals.push({ indicator: 'Fear & Greed', signal: 'BULLISH', reason: 'Extreme fear = buy opportunity', value: fgValue });
      bullishScore += 2;
    } else if (fgValue >= 75) {
      signals.push({ indicator: 'Fear & Greed', signal: 'BEARISH', reason: 'Extreme greed = correction risk', value: fgValue });
      bullishScore -= 2;
    } else if (fgValue <= 45) {
      signals.push({ indicator: 'Fear & Greed', signal: 'SLIGHTLY_BULLISH', reason: 'Fear present', value: fgValue });
      bullishScore += 1;
    } else if (fgValue >= 55) {
      signals.push({ indicator: 'Fear & Greed', signal: 'SLIGHTLY_BEARISH', reason: 'Greed present', value: fgValue });
      bullishScore -= 1;
    } else {
      signals.push({ indicator: 'Fear & Greed', signal: 'NEUTRAL', reason: 'Market balanced', value: fgValue });
    }
  }
  
  // BTC Dominance signal
  if (dominance.success) {
    const btcDom = parseFloat(dominance.dominance?.btc) || 50;
    if (btcDom < 40) {
      signals.push({ indicator: 'BTC Dominance', signal: 'ALT_SEASON', reason: 'Money flowing to alts', value: `${btcDom}%` });
      bullishScore += 1; // Good for alts
    } else if (btcDom > 55) {
      signals.push({ indicator: 'BTC Dominance', signal: 'BTC_SEASON', reason: 'Money flowing to BTC', value: `${btcDom}%` });
    } else {
      signals.push({ indicator: 'BTC Dominance', signal: 'MIXED', reason: 'No clear dominance trend', value: `${btcDom}%` });
    }
  }
  
  // Gas signal (high gas = high activity)
  if (gas.success) {
    const gasPrice = gas.gas?.standard || 0;
    if (gasPrice > 50) {
      signals.push({ indicator: 'ETH Gas', signal: 'HIGH_ACTIVITY', reason: 'Network congested, high demand', value: `${gasPrice} gwei` });
    } else if (gasPrice < 15) {
      signals.push({ indicator: 'ETH Gas', signal: 'LOW_ACTIVITY', reason: 'Network quiet, cheap to transact', value: `${gasPrice} gwei` });
    } else {
      signals.push({ indicator: 'ETH Gas', signal: 'NORMAL', reason: 'Standard network activity', value: `${gasPrice} gwei` });
    }
  }
  
  // Overall market sentiment
  let overallSentiment;
  if (bullishScore >= 2) overallSentiment = '🟢 BULLISH';
  else if (bullishScore >= 1) overallSentiment = '🟢 SLIGHTLY_BULLISH';
  else if (bullishScore <= -2) overallSentiment = '🔴 BEARISH';
  else if (bullishScore <= -1) overallSentiment = '🔴 SLIGHTLY_BEARISH';
  else overallSentiment = '🟡 NEUTRAL';
  
  // Strategy recommendation
  let strategy;
  if (bullishScore >= 2) {
    strategy = 'Accumulate quality assets. Fear = opportunity.';
  } else if (bullishScore <= -2) {
    strategy = 'Take profits, reduce exposure. Market overheated.';
  } else {
    strategy = 'Selective entries only. Wait for clearer signals.';
  }
  
  console.log(JSON.stringify({
    success: true,
    timestamp: new Date().toISOString(),
    overallSentiment: overallSentiment,
    bullishScore: bullishScore,
    strategy: strategy,
    signals: signals,
    data: {
      fearGreed: fearGreed.success ? {
        value: fearGreed.current?.value,
        classification: fearGreed.current?.classification
      } : null,
      btcDominance: dominance.success ? {
        btc: dominance.dominance?.btc,
        eth: dominance.dominance?.eth,
        totalMarketCap: dominance.market?.totalMarketCap
      } : null,
      ethGas: gas.success ? {
        slow: gas.gas?.slow,
        standard: gas.gas?.standard,
        fast: gas.gas?.fast
      } : null,
      trending: trending.success ? trending.coins?.slice(0, 5).map(c => c.symbol) : null
    },
    steps: ["api-fear-greed", "api-btc-dominance", "api-coingecko-trending", "api-eth-gas", "aggregation"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
