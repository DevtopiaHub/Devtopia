#!/usr/bin/env python3
# file-basename-no-ext

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    p = input_data.get('path')
    if not isinstance(p, str):
        print(json.dumps({"ok": False, "error": "Missing required field: path"}))
        sys.exit(1)
    import os
    base = os.path.basename(p)
    name = os.path.splitext(base)[0]
    print(json.dumps({"ok": True, "name": name}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
