# email-normalize

Normalize email casing and whitespace.

## Intent
Normalize email inputs before delivery or validation.

## Gap Justification
We need a shared email normalization step for delivery tooling.

## External Systems
- smtp
- sendgrid

## Input
{ "email": "  USER@Example.com " }

## Output
{ "email": "user@example.com" }

## Example
Input: {"email":"  USER@Example.com "}
Output: {"email":"user@example.com"}
