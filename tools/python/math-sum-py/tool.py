#!/usr/bin/env python3
# math-sum-py

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    numbers = input_data.get('numbers')
    if not isinstance(numbers, list):
        print(json.dumps({"ok": False, "error": "Missing required field: numbers"}))
        sys.exit(1)
    total = 0.0
    for n in numbers:
        total += float(n)
    print(json.dumps({"ok": True, "sum": total}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
