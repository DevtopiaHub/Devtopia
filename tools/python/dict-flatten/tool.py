#!/usr/bin/env python3
# dict-flatten - Flatten nested objects into dot-path keys.
#
# Intent:
# Simplify nested data for indexing or comparison.
#
# Gap Justification:
# Many tools need flat key/value maps for quick analysis.

import json
import sys

input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')


obj = input_data.get('obj')
sep = input_data.get('sep', '.')
if not isinstance(obj, dict):
    print(json.dumps({ 'ok': False, 'error': 'Missing required field: obj (object)' }))
    sys.exit(1)

flat = {}
def walk(prefix, value):
    if isinstance(value, dict):
        for k, v in value.items():
            walk(f"{prefix}{sep}{k}" if prefix else k, v)
    else:
        flat[prefix] = value

walk('', obj)
print(json.dumps({ 'ok': True, 'flat': flat }))
        
