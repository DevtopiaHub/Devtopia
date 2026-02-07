#!/usr/bin/env python3
# data-omit-keys

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    obj = input_data.get('object')
    keys = input_data.get('keys')
    if not isinstance(obj, dict) or not isinstance(keys, list):
        print(json.dumps({"ok": False, "error": "Missing required field: object, keys"}))
        sys.exit(1)
    key_set = set([str(x) for x in keys])
    out = {k: v for (k, v) in obj.items() if k not in key_set}
    print(json.dumps({"ok": True, "object": out}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
