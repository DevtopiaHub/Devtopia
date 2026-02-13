/**
 * api-token-snipe-score - Calculate snipe opportunity score for new tokens
 * Builds on: api-pumpfun-token, api-request-json
 *
 * Analyzes pump.fun tokens to determine if they're good snipe candidates
 * based on bonding curve progress, social presence, and early metrics.
 *
 * @param {Object} params
 * @param {string} params.address - Token mint address (Solana)
 * @returns {Object} Snipe score and analysis
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.address) {
  console.log(JSON.stringify({ error: 'Missing required field: address' }));
  process.exit(1);
}

try {
  // Get pump.fun token data
  const pumpData = devtopiaRun('api-pumpfun-token', { address: input.address });
  
  if (!pumpData.success) {
    console.log(JSON.stringify({ 
      success: false, 
      error: 'Token not found on pump.fun' 
    }));
    process.exit(0);
  }
  
  // Calculate snipe score (0-100)
  let score = 50; // Start neutral
  const factors = [];
  
  // 1. Bonding curve progress (sweet spot: 10-40%)
  const bondingProgress = parseFloat(pumpData.bondingCurveProgress) || 0;
  if (bondingProgress < 5) {
    score += 15; // Very early
    factors.push({ factor: 'Very early entry', impact: '+15', value: `${bondingProgress}%` });
  } else if (bondingProgress < 20) {
    score += 10; // Early
    factors.push({ factor: 'Early entry', impact: '+10', value: `${bondingProgress}%` });
  } else if (bondingProgress > 70) {
    score -= 15; // Late, near graduation
    factors.push({ factor: 'Late entry risk', impact: '-15', value: `${bondingProgress}%` });
  } else if (bondingProgress > 50) {
    score -= 5;
    factors.push({ factor: 'Mid-late entry', impact: '-5', value: `${bondingProgress}%` });
  }
  
  // 2. Market cap check
  const mc = pumpData.marketCap || 0;
  if (mc < 5000) {
    score += 10; // Low MC = more upside
    factors.push({ factor: 'Low market cap', impact: '+10', value: `$${mc.toLocaleString()}` });
  } else if (mc > 50000) {
    score -= 10;
    factors.push({ factor: 'Higher market cap', impact: '-10', value: `$${mc.toLocaleString()}` });
  }
  
  // 3. Social presence
  if (pumpData.twitter) {
    score += 10;
    factors.push({ factor: 'Has Twitter', impact: '+10', value: pumpData.twitter });
  }
  if (pumpData.telegram) {
    score += 5;
    factors.push({ factor: 'Has Telegram', impact: '+5', value: pumpData.telegram });
  }
  if (pumpData.website) {
    score += 5;
    factors.push({ factor: 'Has Website', impact: '+5', value: pumpData.website });
  }
  
  // 4. Token metadata quality
  const hasImage = pumpData.token?.image && !pumpData.token.image.includes('default');
  const hasDescription = pumpData.token?.description && pumpData.token.description.length > 20;
  
  if (hasImage && hasDescription) {
    score += 5;
    factors.push({ factor: 'Good metadata', impact: '+5', value: 'Image + description' });
  } else if (!hasImage && !hasDescription) {
    score -= 10;
    factors.push({ factor: 'Poor metadata', impact: '-10', value: 'No image/description' });
  }
  
  // 5. Already graduated?
  if (pumpData.complete) {
    score -= 20;
    factors.push({ factor: 'Already graduated', impact: '-20', value: 'On Raydium' });
  }
  
  // 6. King of the hill bonus
  if (pumpData.kingOfTheHill) {
    score += 15;
    factors.push({ factor: 'Was KOTH', impact: '+15', value: 'Reached top' });
  }
  
  // Clamp score
  score = Math.max(0, Math.min(100, score));
  
  // Determine verdict
  let verdict, action;
  if (score >= 75) {
    verdict = '🟢 STRONG SNIPE';
    action = 'Consider entry with tight stop loss';
  } else if (score >= 60) {
    verdict = '🟡 DECENT OPPORTUNITY';
    action = 'Monitor for better entry or catalyst';
  } else if (score >= 40) {
    verdict = '🟠 WEAK SETUP';
    action = 'Wait for more confirmation';
  } else {
    verdict = '🔴 AVOID';
    action = 'Too risky or too late';
  }
  
  console.log(JSON.stringify({
    success: true,
    token: pumpData.token,
    snipeScore: score,
    verdict: verdict,
    action: action,
    factors: factors,
    metrics: {
      bondingProgress: `${bondingProgress}%`,
      marketCap: mc,
      graduated: pumpData.complete,
      hasTwitter: !!pumpData.twitter,
      hasTelegram: !!pumpData.telegram,
      hasWebsite: !!pumpData.website
    },
    timing: bondingProgress < 20 
      ? 'EARLY' 
      : bondingProgress < 50 
        ? 'MID' 
        : bondingProgress < 80 
          ? 'LATE' 
          : 'VERY_LATE',
    steps: ["api-pumpfun-token", "snipe-analysis"]
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
