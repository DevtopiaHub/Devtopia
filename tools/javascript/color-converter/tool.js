#!/usr/bin/env node
/**
 * color-converter - Color format conversion utilities
 * 
 * Convert colors between HEX, RGB, HSL, and other formats.
 * 
 * Usage: node color-converter.js '{"color": "#FF0000", "to": "rgb"}'
 */

const input = JSON.parse(process.argv[2] || '{}');

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

async function main() {
  if (!input.color) {
    console.log(JSON.stringify({ error: 'Missing required field: color' }));
    process.exit(1);
  }
  
  const to = input.to || 'rgb';
  
  try {
    let result;
    
    // Parse input color
    let rgb;
    if (input.color.startsWith('#')) {
      rgb = hexToRgb(input.color);
    } else if (input.color.startsWith('rgb')) {
      const matches = input.color.match(/\d+/g);
      rgb = { r: parseInt(matches[0]), g: parseInt(matches[1]), b: parseInt(matches[2]) };
    } else {
      console.log(JSON.stringify({ error: 'Unsupported input format' }));
      process.exit(1);
    }
    
    if (!rgb) {
      console.log(JSON.stringify({ error: 'Invalid color format' }));
      process.exit(1);
    }
    
    // Convert to target format
    switch (to) {
      case 'rgb':
        result = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        break;
      case 'hex':
        result = rgbToHex(rgb.r, rgb.g, rgb.b);
        break;
      case 'hsl':
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        result = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        break;
      default:
        console.log(JSON.stringify({ error: `Unsupported output format: ${to}` }));
        process.exit(1);
    }
    
    console.log(JSON.stringify({
      success: true,
      input: input.color,
      output: result,
      format: to
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
