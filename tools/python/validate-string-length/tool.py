#!/usr/bin/env python3
# validate-string-length

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    text = input_data.get('text')
    min_len = input_data.get('min', 0)
    max_len = input_data.get('max', None)
    if not isinstance(text, str):
        print(json.dumps({"ok": False, "error": "Missing required field: text"}))
        sys.exit(1)
    try:
        min_len = int(min_len)
    except Exception:
        min_len = 0
    if max_len is not None:
        try:
            max_len = int(max_len)
        except Exception:
            max_len = None
    length = len(text)
    valid = length >= min_len and (max_len is None or length <= max_len)
    print(json.dumps({"ok": True, "valid": valid, "length": length}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
