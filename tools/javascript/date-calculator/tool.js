#!/usr/bin/env node
/**
 * date-calculator - Calculate date differences and add/subtract time periods
 */
const input = JSON.parse(process.argv[2] || '{}');
const { date1, date2, operation, amount, unit } = input;

function parseDate(dateInput) {
  if (typeof dateInput === 'number') {
    return new Date(dateInput);
  }
  if (typeof dateInput === 'string') {
    const parsed = new Date(dateInput);
    if (isNaN(parsed.getTime())) {
      throw new Error(`Invalid date: ${dateInput}`);
    }
    return parsed;
  }
  throw new Error('Invalid date format');
}

function addTime(date, amount, unit) {
  const result = new Date(date);
  
  switch (unit) {
    case 'milliseconds':
    case 'ms':
      result.setMilliseconds(result.getMilliseconds() + amount);
      break;
    case 'seconds':
    case 's':
      result.setSeconds(result.getSeconds() + amount);
      break;
    case 'minutes':
    case 'm':
      result.setMinutes(result.getMinutes() + amount);
      break;
    case 'hours':
    case 'h':
      result.setHours(result.getHours() + amount);
      break;
    case 'days':
    case 'd':
      result.setDate(result.getDate() + amount);
      break;
    case 'weeks':
    case 'w':
      result.setDate(result.getDate() + (amount * 7));
      break;
    case 'months':
    case 'M':
      result.setMonth(result.getMonth() + amount);
      break;
    case 'years':
    case 'y':
      result.setFullYear(result.getFullYear() + amount);
      break;
    default:
      throw new Error(`Unknown unit: ${unit}`);
  }
  
  return result;
}

try {
  if (operation === 'diff') {
    if (!date1 || !date2) {
      console.log(JSON.stringify({ error: 'Missing required parameters: date1 and date2' }));
      process.exit(1);
    }
    
    const d1 = parseDate(date1);
    const d2 = parseDate(date2);
    const diffMs = Math.abs(d2 - d1);
    
    console.log(JSON.stringify({
      difference: {
        milliseconds: diffMs,
        seconds: Math.floor(diffMs / 1000),
        minutes: Math.floor(diffMs / 60000),
        hours: Math.floor(diffMs / 3600000),
        days: Math.floor(diffMs / 86400000)
      },
      date1: d1.toISOString(),
      date2: d2.toISOString()
    }));
  } else if (operation === 'add' || operation === 'subtract') {
    if (!date1 || amount === undefined || !unit) {
      console.log(JSON.stringify({ error: 'Missing required parameters: date1, amount, and unit' }));
      process.exit(1);
    }
    
    const d1 = parseDate(date1);
    const adjustedAmount = operation === 'subtract' ? -amount : amount;
    const result = addTime(d1, adjustedAmount, unit);
    
    console.log(JSON.stringify({
      result: result.toISOString(),
      original: d1.toISOString(),
      operation,
      amount: adjustedAmount,
      unit
    }));
  } else {
    console.log(JSON.stringify({ error: 'Invalid operation. Use "diff", "add", or "subtract"' }));
    process.exit(1);
  }
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
