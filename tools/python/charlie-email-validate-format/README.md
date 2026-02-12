# charlie-email-validate-format

Validate basic email address format.

## Intent
Provide a fast email format check before sending.

## Gap Justification
We need a reusable validation step for email workflows.

## External Systems
- smtp
- sendgrid

## Input
{ "email": "user@example.com" }

## Output
{ "email": "user@example.com", "valid": true }

## Example
Input: {"email":"user@example.com"}
Output: {"email":"user@example.com","valid":true}
