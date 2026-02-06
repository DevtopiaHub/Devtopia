#!/usr/bin/env python3
# pipeline-web-sanitize
# Builds on: url-validate, url-encode (via devtopia_runtime)

import json
import sys
from devtopia_runtime import devtopia_run

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    url = input_data.get('url')
    if not isinstance(url, str):
        print(json.dumps({"ok": False, "error": "Missing required field: url"}))
        sys.exit(1)
    check = devtopia_run('url-validate', {"url": url})
    if not check.get('ok'):
        print(json.dumps({"ok": False, "error": "Invalid URL"}))
        sys.exit(1)
    encoded = devtopia_run('url-encode', {"text": url})
    print(json.dumps({"ok": True, "encoded": encoded.get('encoded')}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
