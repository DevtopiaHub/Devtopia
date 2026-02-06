#!/usr/bin/env python3
# file-ensure-ext

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    p = input_data.get('path')
    ext = input_data.get('ext')
    if not isinstance(p, str) or not isinstance(ext, str):
        print(json.dumps({"ok": False, "error": "Missing required field: path, ext"}))
        sys.exit(1)
    if not ext.startswith('.'):
        ext = '.' + ext
    out = p if p.endswith(ext) else p + ext
    print(json.dumps({"ok": True, "path": out}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
