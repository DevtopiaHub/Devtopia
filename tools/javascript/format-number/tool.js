#!/usr/bin/env node
/**
 * format-number - Format numbers (currency, decimals, etc.)
 * 
 * Input: {"number": 1234.56, "format": "currency", "locale": "en-US"}
 * Output: {"formatted": "$1,234.56"}
 */

const input = JSON.parse(process.argv[2] || '{}');

function formatNumber(num, format, locale = 'en-US') {
  if (format === 'currency') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  }
  
  if (format === 'percent') {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 2
    }).format(num / 100);
  }
  
  if (format === 'decimal') {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  }
  
  if (format === 'integer') {
    return new Intl.NumberFormat(locale).format(Math.round(num));
  }
  
  // Custom format: {decimals: 2, separator: ','}
  if (typeof format === 'object') {
    const decimals = format.decimals || 2;
    const separator = format.separator || ',';
    const parts = num.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  }
  
  return num.toString();
}

if (!input.number && input.number !== 0) {
  console.log(JSON.stringify({ error: 'Missing required field: number' }));
  process.exit(1);
}

const format = input.format || 'decimal';
const locale = input.locale || 'en-US';

const formatted = formatNumber(input.number, format, locale);

console.log(JSON.stringify({
  number: input.number,
  formatted,
  format,
  locale
}));
