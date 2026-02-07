#!/usr/bin/env python3
# social-webhook-batch - Send a batch of messages to a webhook.
#
# Intent:
# Post multiple updates to a webhook endpoint.
#
# Gap Justification:
# Agents need a simple webhook batch sender.

import json
import sys

input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')


import urllib.request

webhook_url = input_data.get('webhook_url')
messages = input_data.get('messages')
if not isinstance(webhook_url, str) or not isinstance(messages, list):
    print(json.dumps({ 'ok': False, 'error': 'Missing required fields: webhook_url, messages' }))
    sys.exit(1)

sent = 0
for msg in messages:
    payload = json.dumps({ 'text': str(msg) }).encode('utf-8')
    req = urllib.request.Request(webhook_url, data=payload, method='POST')
    req.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            if response.status < 300:
                sent += 1
    except Exception:
        continue

print(json.dumps({ 'ok': True, 'sent': sent }))
        
