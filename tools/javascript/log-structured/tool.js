/**
 * Create structured log entries with timestamp and metadata
 * @param {Object} params - Log parameters
 * @param {string} params.level - Log level (info, warn, error, debug)
 * @param {string} params.message - Log message
 * @param {Object} params.metadata - Additional metadata object
 * @returns {Object} Structured log entry
 */
function main(params) {
  const { level = 'info', message, metadata = {} } = params;

  if (!message) {
    throw new Error('Message is required');
  }

  const validLevels = ['info', 'warn', 'error', 'debug'];
  if (!validLevels.includes(level)) {
    throw new Error(`Invalid log level. Must be one of: ${validLevels.join(', ')}`);
  }

  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...metadata
  };
}
