#!/usr/bin/env python3
# web-parse-headers

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    raw = input_data.get('headers')
    if not isinstance(raw, str):
        print(json.dumps({"ok": False, "error": "Missing required field: headers"}))
        sys.exit(1)
    headers = {}
    for line in raw.splitlines():
        if ':' not in line:
            continue
        key, value = line.split(':', 1)
        headers[key.strip()] = value.strip()
    print(json.dumps({"ok": True, "headers": headers}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
