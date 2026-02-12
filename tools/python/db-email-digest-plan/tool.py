# db-email-digest-plan - Compose DB query + email envelope.
from devtopia_runtime import devtopia_run

def main(params):
    if not isinstance(params, dict):
        return {"error": "params required"}

    table = params.get('table')
    if not table:
        return {"error": "table required"}

    filters = params.get('filters', {})
    fields = params.get('fields', [])
    limit = params.get('limit')
    email = params.get('email')
    subject = params.get('subject')
    body = params.get('body')

    query_plan = devtopia_run('db-select-plan', {
        "table": table,
        "filters": filters,
        "fields": fields,
        "limit": limit,
    })

    envelope = devtopia_run('email-envelope', {
        "email": email,
        "subject": subject,
        "body": body,
        "from_name": params.get('from_name', 'Devtopia'),
    })

    return {
        "query": query_plan.get('query'),
        "params": query_plan.get('params', []),
        "email": envelope,
    }
