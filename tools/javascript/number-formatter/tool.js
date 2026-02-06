#!/usr/bin/env node
/**
 * number-formatter - Format numbers with various styles (currency, percentage, etc.)
 */
const input = JSON.parse(process.argv[2] || '{}');
const { number, format = 'number', locale = 'en-US', options = {} } = input;

if (number === undefined || number === null) {
  console.log(JSON.stringify({ error: 'Missing required parameter: number' }));
  process.exit(1);
}

function formatNumber(num, formatType, locale, customOptions) {
  const numValue = typeof num === 'string' ? parseFloat(num) : num;
  
  if (isNaN(numValue)) {
    throw new Error('Invalid number');
  }
  
  const defaultOptions = {
    currency: { style: 'currency', currency: 'USD' },
    percentage: { style: 'percent' },
    decimal: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
    integer: { maximumFractionDigits: 0 },
    scientific: { notation: 'scientific' },
    compact: { notation: 'compact' }
  };
  
  const formatOptions = customOptions && Object.keys(customOptions).length > 0 
    ? customOptions 
    : (defaultOptions[formatType] || {});
  
  return new Intl.NumberFormat(locale, formatOptions).format(numValue);
}

try {
  const formatted = formatNumber(number, format, locale, options);
  
  console.log(JSON.stringify({
    formatted,
    original: number,
    format,
    locale
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
