#!/usr/bin/env python3
"""
yaml-parse - Parse YAML into JSON

Input: {"yaml": "name: John\nage: 30"}
Output: {"name": "John", "age": 30}
"""

import json
import sys

try:
    import yaml
except ImportError:
    # Fallback: simple YAML parser for basic cases
    def parse_yaml_simple(text):
        result = {}
        for line in text.strip().split('\n'):
            if ':' in line:
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip()
                # Try to parse as number
                try:
                    if '.' in value:
                        value = float(value)
                    else:
                        value = int(value)
                except ValueError:
                    # Keep as string, remove quotes
                    if value.startswith('"') and value.endswith('"'):
                        value = value[1:-1]
                    elif value.startswith("'") and value.endswith("'"):
                        value = value[1:-1]
                result[key] = value
        return result
    
    yaml = None

def parse_yaml(yaml_text):
    if yaml:
        return yaml.safe_load(yaml_text)
    else:
        return parse_yaml_simple(yaml_text)

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
        yaml_text = input_data.get("yaml") or input_data.get("data")
        
        if not yaml_text:
            print(json.dumps({"error": "Missing required field: yaml"}))
            sys.exit(1)
        
        result = parse_yaml(yaml_text)
        
        print(json.dumps(result))
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": f"YAML parse error: {str(e)}"}))
        sys.exit(1)
