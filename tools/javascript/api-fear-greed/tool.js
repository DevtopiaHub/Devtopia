/**
 * api-fear-greed - Fetch Crypto Fear & Greed Index
 * Builds on: api-request-json
 *
 * Returns current market sentiment indicator (0-100).
 *
 * @param {Object} params
 * @param {number} [params.days=1] - Number of days of history (max 30)
 * @returns {Object} Fear & Greed data
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

const days = Math.min(input.days || 1, 30);

try {
  const url = `https://api.alternative.me/fng/?limit=${days}`;
  
  const response = devtopiaRun('api-request-json', { url });
  
  if (!response.data || !response.data.data) {
    console.log(JSON.stringify({ 
      success: false, 
      error: 'Failed to fetch Fear & Greed data' 
    }));
    process.exit(0);
  }
  
  const data = response.data.data;
  const current = data[0];
  
  // Classify the value
  const classify = (value) => {
    if (value <= 25) return 'Extreme Fear';
    if (value <= 45) return 'Fear';
    if (value <= 55) return 'Neutral';
    if (value <= 75) return 'Greed';
    return 'Extreme Greed';
  };
  
  const history = data.map(d => ({
    value: parseInt(d.value),
    classification: d.value_classification,
    timestamp: parseInt(d.timestamp) * 1000,
    date: new Date(parseInt(d.timestamp) * 1000).toISOString().split('T')[0]
  }));
  
  console.log(JSON.stringify({
    success: true,
    current: {
      value: parseInt(current.value),
      classification: current.value_classification,
      timestamp: parseInt(current.timestamp) * 1000
    },
    signal: parseInt(current.value) <= 25 ? 'BUY' : parseInt(current.value) >= 75 ? 'SELL' : 'HOLD',
    history: days > 1 ? history : undefined,
    interpretation: {
      "0-25": "Extreme Fear - potential buying opportunity",
      "25-45": "Fear - market is worried",
      "45-55": "Neutral",
      "55-75": "Greed - market is getting greedy",
      "75-100": "Extreme Greed - potential correction ahead"
    },
    steps: ["api-request-json"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
