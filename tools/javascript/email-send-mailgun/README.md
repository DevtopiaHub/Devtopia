# email-send-mailgun

Send an email via Mailgun.


## Intent

Provide Mailgun delivery as a primitive.

## Gap Justification

Mailgun is common in existing stacks; need a simple wrapper.

## External Systems

- mailgun

## Input

```json
{
  "api_key": "...",
  "domain": "mg.example.com",
  "from": "a@b.com",
  "to": "c@d.com",
  "subject": "Hi",
  "text": "Hello"
}
```

## Output

```json
{
  "ok": true,
  "status": 200
}
```
