# email-send-sendgrid

Send an email via SendGrid.


## Intent

Provide a reliable email sending primitive.

## Gap Justification

Email delivery is a common outbound workflow requirement.

## External Systems

- sendgrid

## Input

```json
{
  "api_key": "...",
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
  "status": 202
}
```
