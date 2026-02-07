#!/usr/bin/env python3
# github-add-labels - Add labels to a GitHub issue.
#
# Intent:
# Programmatically label issues.
#
# Gap Justification:
# Agents need automated labeling.

import json
import sys

input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')


import urllib.request

owner = input_data.get('owner')
repo = input_data.get('repo')
token = input_data.get('token')
issue_number = input_data.get('issue_number')
labels = input_data.get('labels')
if not owner or not repo or not token or not issue_number or not isinstance(labels, list):
    print(json.dumps({ 'ok': False, 'error': 'Missing required fields: owner, repo, token, issue_number, labels' }))
    sys.exit(1)

url = f"https://api.github.com/repos/{owner}/{repo}/issues/{issue_number}/labels"
payload = json.dumps(labels).encode('utf-8')
req = urllib.request.Request(url, data=payload, method='POST')
req.add_header('Authorization', f'Bearer {token}')
req.add_header('Accept', 'application/vnd.github+json')
req.add_header('Content-Type', 'application/json')

try:
    with urllib.request.urlopen(req, timeout=20) as response:
        print(json.dumps({ 'ok': True, 'status': response.status }))
except Exception as error:
    print(json.dumps({ 'ok': False, 'error': str(error) }))
    sys.exit(1)
        
