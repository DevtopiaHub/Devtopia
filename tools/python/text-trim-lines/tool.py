#!/usr/bin/env python3
# text-trim-lines

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    text = input_data.get('text')
    drop_empty = input_data.get('drop_empty', True)
    if not isinstance(text, str):
        print(json.dumps({"ok": False, "error": "Missing required field: text"}))
        sys.exit(1)
    lines = [line.strip() for line in text.splitlines()]
    if drop_empty:
        lines = [l for l in lines if l != '']
    print(json.dumps({"ok": True, "lines": lines, "count": len(lines)}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
