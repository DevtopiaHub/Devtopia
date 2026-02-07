#!/usr/bin/env python3
# api-oauth-health-check - Fetch OAuth token then check an API endpoint.
#
# Intent:
# Provide a one-call OAuth health check.
#
# Gap Justification:
# Agents need a simple OAuth + API check pipeline.

import json
import sys

input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')


from devtopia_runtime import devtopia_run

token_url = input_data.get('token_url')
client_id = input_data.get('client_id')
client_secret = input_data.get('client_secret')
url = input_data.get('url')
if not token_url or not client_id or not client_secret or not url:
    print(json.dumps({ 'ok': False, 'error': 'Missing required fields: token_url, client_id, client_secret, url' }))
    sys.exit(1)

try:
    token_resp = devtopia_run('api-request-oauth-client', {
        'token_url': token_url,
        'client_id': client_id,
        'client_secret': client_secret
    })
    token = token_resp.get('token')
    if not token:
        print(json.dumps({ 'ok': False, 'error': 'No token returned' }))
        sys.exit(1)
    result = devtopia_run('api-request-bearer', { 'url': url, 'token': token, 'method': 'GET' })
    print(json.dumps({ 'ok': True, 'status': result.get('status'), 'data': result.get('data') }))
except Exception as error:
    print(json.dumps({ 'ok': False, 'error': str(error) }))
    sys.exit(1)
        
