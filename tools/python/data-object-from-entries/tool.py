#!/usr/bin/env python3
# data-object-from-entries

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    entries = input_data.get('entries')
    if not isinstance(entries, list):
        print(json.dumps({"ok": False, "error": "Missing required field: entries"}))
        sys.exit(1)
    obj = {}
    for item in entries:
        if isinstance(item, list) and len(item) == 2:
            obj[str(item[0])] = item[1]
    print(json.dumps({"ok": True, "object": obj}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
