# email-send-postmark

Send an email via Postmark.


## Intent

Provide Postmark delivery as a primitive.

## Gap Justification

Postmark is widely used for transactional email.

## External Systems

- postmark

## Input

```json
{
  "server_token": "...",
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
