#!/usr/bin/env python3
# math-standard-deviation

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    nums = input_data.get('numbers')
    if not isinstance(nums, list) or len(nums) == 0:
        print(json.dumps({"ok": False, "error": "Missing required field: numbers"}))
        sys.exit(1)
    vals = [float(n) for n in nums]
    mean = sum(vals) / len(vals)
    var = sum((n - mean) ** 2 for n in vals) / len(vals)
    std = var ** 0.5
    print(json.dumps({"ok": True, "stddev": std, "count": len(vals)}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
