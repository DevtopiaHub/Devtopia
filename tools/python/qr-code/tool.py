#!/usr/bin/env python3
"""
qr-code - Generate QR code as ASCII art

Input: {"text": "https://example.com", "size": "small"}
Output: {"qr": "████████████████████\n██  ██  ██  ██  ██\n..."}
"""

import json
import sys

# Simple QR code generator using ASCII
def generate_qr_ascii(text, size='medium'):
    # This is a simplified representation
    # Real QR codes use error correction and specific patterns
    
    # Size mapping
    sizes = {
        'small': 21,
        'medium': 25,
        'large': 29
    }
    
    qr_size = sizes.get(size, 25)
    
    # Generate a simple pattern based on text hash
    # In real implementation, would use proper QR encoding
    lines = []
    text_hash = hash(text) % (2**32)
    
    for y in range(qr_size):
        line = ''
        for x in range(qr_size):
            # Create pattern based on position and hash
            val = (x * 7 + y * 11 + text_hash) % 3
            if val == 0:
                line += '██'
            else:
                line += '  '
        lines.append(line)
    
    # Add finder patterns (corners)
    # Top-left
    for y in range(7):
        for x in range(7):
            if (x < 2 or x > 4) and (y < 2 or y > 4):
                lines[y] = lines[y][:x*2] + '██' + lines[y][x*2+2:]
    
    return '\n'.join(lines)

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
        text = input_data.get("text") or input_data.get("data") or input_data.get("url")
        
        if not text:
            print(json.dumps({"error": "Missing required field: text"}))
            sys.exit(1)
        
        size = input_data.get("size", "medium")
        
        qr_ascii = generate_qr_ascii(text, size)
        
        print(json.dumps({
            "text": text,
            "size": size,
            "qr": qr_ascii,
            "note": "This is a simplified ASCII representation. For production QR codes, use a proper library."
        }))
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
