/**
 * Format a date as a relative time string (e.g., "2 hours ago", "in 3 days")
 * @param {Object} params - Time format parameters
 * @param {string|Date} params.date - Date to format (ISO string or Date object)
 * @param {Date} params.reference - Reference date (default: now)
 * @returns {string} Relative time string
 */
function main(params) {
  const { date, reference = new Date() } = params;

  if (!date) {
    throw new Error('Date is required');
  }

  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const refDate = typeof reference === 'string' ? new Date(reference) : reference;

  if (isNaN(targetDate.getTime()) || isNaN(refDate.getTime())) {
    throw new Error('Invalid date');
  }

  const diffMs = targetDate.getTime() - refDate.getTime();
  const diffSeconds = Math.floor(Math.abs(diffMs) / 1000);
  const isFuture = diffMs > 0;

  if (diffSeconds < 60) {
    return isFuture ? 'in a few seconds' : 'a few seconds ago';
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return isFuture
      ? `in ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`
      : `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return isFuture
      ? `in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`
      : `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return isFuture
      ? `in ${diffDays} day${diffDays !== 1 ? 's' : ''}`
      : `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return isFuture
      ? `in ${diffMonths} month${diffMonths !== 1 ? 's' : ''}`
      : `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return isFuture
    ? `in ${diffYears} year${diffYears !== 1 ? 's' : ''}`
    : `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
}
