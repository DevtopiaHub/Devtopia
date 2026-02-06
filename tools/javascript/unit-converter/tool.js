#!/usr/bin/env node
/**
 * unit-converter - Convert between different units (length, weight, temperature, etc.)
 */
const input = JSON.parse(process.argv[2] || '{}');
const { value, from, to, type = 'length' } = input;

if (value === undefined || !from || !to) {
  console.log(JSON.stringify({ error: 'Missing required parameters: value, from, and to' }));
  process.exit(1);
}

const conversions = {
  length: {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.34,
    ft: 0.3048,
    in: 0.0254,
    yd: 0.9144
  },
  weight: {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.453592,
    oz: 0.0283495,
    ton: 1000
  },
  temperature: {
    c: (val) => val,
    f: (val) => (val - 32) * 5/9,
    k: (val) => val - 273.15
  },
  volume: {
    l: 1,
    ml: 0.001,
    gal: 3.78541,
    qt: 0.946353,
    pt: 0.473176,
    cup: 0.236588,
    floz: 0.0295735
  }
};

function convert(value, fromUnit, toUnit, conversionType) {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    throw new Error('Invalid value');
  }
  
  if (conversionType === 'temperature') {
    // Convert to Celsius first
    const celsius = conversions.temperature[from.toLowerCase()](numValue);
    // Then convert from Celsius to target
    if (to.toLowerCase() === 'c') return celsius;
    if (to.toLowerCase() === 'f') return (celsius * 9/5) + 32;
    if (to.toLowerCase() === 'k') return celsius + 273.15;
    throw new Error(`Unknown temperature unit: ${to}`);
  } else {
    const type = conversions[conversionType];
    if (!type) {
      throw new Error(`Unknown conversion type: ${conversionType}`);
    }
    
    if (!type[from.toLowerCase()] || !type[to.toLowerCase()]) {
      throw new Error(`Unknown unit for ${conversionType}`);
    }
    
    // Convert to base unit, then to target unit
    const baseValue = numValue * type[from.toLowerCase()];
    const result = baseValue / type[to.toLowerCase()];
    
    return result;
  }
}

try {
  const result = convert(value, from, to, type);
  console.log(JSON.stringify({
    result,
    original: value,
    from,
    to,
    type
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
