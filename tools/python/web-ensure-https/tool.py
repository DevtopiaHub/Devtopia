#!/usr/bin/env python3
# web-ensure-https

import json
import sys

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
    if url.startswith('http://'):
        url = 'https://' + url[len('http://'): ]
    elif not url.startswith('https://'):
        url = 'https://' + url
    print(json.dumps({"ok": True, "url": url}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
