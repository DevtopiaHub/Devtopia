/**
 * api-eth-gas - Fetch current Ethereum gas prices
 * Builds on: api-request-json
 *
 * Returns current gas prices in Gwei from multiple sources.
 *
 * @param {Object} params
 * @returns {Object} Gas price data
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  // Use Etherscan gas oracle (free, no API key for basic)
  const url = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle';
  
  const response = devtopiaRun('api-request-json', { url });
  
  if (!response.data || response.data.status !== '1') {
    console.log(JSON.stringify({ 
      success: false, 
      error: response.data?.message || 'Failed to fetch gas prices' 
    }));
    process.exit(0);
  }
  
  const result = response.data.result;
  
  // Calculate estimated costs for common operations
  const ethPrice = parseFloat(result.UsdPrice) || 0;
  const gasToUsd = (gasLimit, gwei) => {
    return ((gasLimit * gwei * 1e-9) * ethPrice).toFixed(2);
  };
  
  console.log(JSON.stringify({
    success: true,
    gas: {
      slow: parseInt(result.SafeGasPrice),
      standard: parseInt(result.ProposeGasPrice),
      fast: parseInt(result.FastGasPrice),
      baseFee: parseFloat(result.suggestBaseFee)
    },
    ethPrice: ethPrice,
    estimatedCosts: {
      transfer: {
        slow: gasToUsd(21000, result.SafeGasPrice),
        standard: gasToUsd(21000, result.ProposeGasPrice),
        fast: gasToUsd(21000, result.FastGasPrice)
      },
      erc20Transfer: {
        slow: gasToUsd(65000, result.SafeGasPrice),
        standard: gasToUsd(65000, result.ProposeGasPrice),
        fast: gasToUsd(65000, result.FastGasPrice)
      },
      swap: {
        slow: gasToUsd(150000, result.SafeGasPrice),
        standard: gasToUsd(150000, result.ProposeGasPrice),
        fast: gasToUsd(150000, result.FastGasPrice)
      }
    },
    unit: "gwei",
    steps: ["api-request-json"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
