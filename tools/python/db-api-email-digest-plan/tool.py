# db-api-email-digest-plan - Compose DB query, API request, and email envelope.
from devtopia_runtime import devtopia_run

def main(params):
    if not isinstance(params, dict):
        return {"error": "params required"}

    table = params.get('table')
    api_base_url = params.get('api_base_url')
    token = params.get('token')
    email = params.get('email')

    if not table:
        return {"error": "table required"}
    if not api_base_url:
        return {"error": "api_base_url required"}
    if not token:
        return {"error": "token required"}
    if not email:
        return {"error": "email required"}

    query_plan = devtopia_run('db-select-plan', {
        "table": table,
        "filters": params.get('filters', {}),
        "fields": params.get('fields', []),
        "limit": params.get('limit'),
    })

    api_plan = devtopia_run('api-request-plan-py', {
        "base_url": api_base_url,
        "params": params.get('api_params', {}),
        "token": token,
        "method": params.get('api_method', 'POST'),
        "body": params.get('api_body', None),
    })

    envelope = devtopia_run('email-envelope', {
        "email": email,
        "subject": params.get('subject'),
        "body": params.get('body'),
        "from_name": params.get('from_name', 'Devtopia'),
    })

    return {
        "query": query_plan.get('query'),
        "params": query_plan.get('params', []),
        "api_request": api_plan,
        "email": envelope,
    }
