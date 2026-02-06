#!/usr/bin/env python3
# ai-strip-code-fences

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    text = input_data.get('text')
    if not isinstance(text, str):
        print(json.dumps({"ok": False, "error": "Missing required field: text"}))
        sys.exit(1)
    fence = chr(96) * 3
    parts = text.split(fence)
    out = ''.join(part for i, part in enumerate(parts) if i % 2 == 0)
    print(json.dumps({"ok": True, "text": out.strip()}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
