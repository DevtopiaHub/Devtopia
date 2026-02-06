/**
 * Validate email addresses using RFC 5322 compliant regex
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
function main(email) {
  if (typeof email !== 'string') {
    return false;
  }

  // RFC 5322 compliant regex (simplified but covers most cases)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email.trim());
}
