/**
 * Calculate retry delay with exponential backoff
 * @param {Object} params - Retry parameters
 * @param {number} params.attempt - Current attempt number (0-indexed)
 * @param {number} params.baseDelay - Base delay in milliseconds (default: 1000)
 * @param {number} params.maxDelay - Maximum delay in milliseconds (default: 30000)
 * @param {number} params.multiplier - Exponential multiplier (default: 2)
 * @param {boolean} params.jitter - Add random jitter to prevent thundering herd (default: true)
 * @returns {number} Delay in milliseconds
 */
function main(params) {
  const {
    attempt,
    baseDelay = 1000,
    maxDelay = 30000,
    multiplier = 2,
    jitter = true
  } = params;

  if (typeof attempt !== 'number' || attempt < 0) {
    throw new Error('Attempt must be a non-negative number');
  }

  // Exponential backoff: baseDelay * (multiplier ^ attempt)
  let delay = baseDelay * Math.pow(multiplier, attempt);

  // Cap at maxDelay
  delay = Math.min(delay, maxDelay);

  // Add jitter (±20%) to prevent synchronized retries
  if (jitter) {
    const jitterAmount = delay * 0.2;
    const jitterValue = (Math.random() * 2 - 1) * jitterAmount;
    delay = Math.max(0, delay + jitterValue);
  }

  return Math.round(delay);
}
