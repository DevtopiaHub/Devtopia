#!/usr/bin/env python3
# security-base32-encode

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    import base64
    text = input_data.get('text')
    if not isinstance(text, str):
        print(json.dumps({"ok": False, "error": "Missing required field: text"}))
        sys.exit(1)
    encoded = base64.b32encode(text.encode("utf-8")).decode("utf-8")
    print(json.dumps({"ok": True, "base32": encoded}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
