# email-envelope - Build an email envelope using composed tools.
from devtopia_runtime import devtopia_run

def main(params):
    email = params.get('email') if isinstance(params, dict) else ''
    if not email:
        return {"error": "email required"}
    normalized = devtopia_run('email-normalize', {"email": email})
    validation = devtopia_run('email-validate-format', {"email": normalized.get('email')})
    if not validation.get('valid'):
        return {"error": "invalid email"}
    subject = params.get('subject') if isinstance(params, dict) else ''
    body = params.get('body') if isinstance(params, dict) else ''
    from_name = params.get('from_name') if isinstance(params, dict) else 'Devtopia'
    return {
        "from": {"name": from_name, "email": "no-reply@devtopia.net"},
        "to": validation.get('email'),
        "subject": subject or 'Hello',
        "body": body or ''
    }
