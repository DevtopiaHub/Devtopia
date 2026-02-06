#!/usr/bin/env python3
# validate-between

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    value = input_data.get('value')
    min_v = input_data.get('min')
    max_v = input_data.get('max')
    if not isinstance(value, (int, float)) or not isinstance(min_v, (int, float)) or not isinstance(max_v, (int, float)):
        print(json.dumps({"ok": False, "error": "Missing required field: value, min, max"}))
        sys.exit(1)
    valid = (value >= min_v) and (value <= max_v)
    print(json.dumps({"ok": True, "valid": valid}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
