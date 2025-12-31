# Mochan-D Upgraded - Email Backend

This small Express server provides a single endpoint to send contact emails from the website.

## Setup

1. Copy `.env.example` to `.env` and fill your SMTP credentials (recommended) or SendGrid API key.

2. Install dependencies and run:

```bash
cd server
npm install
npm start
```

3. By default the server listens on port `3000`. The website will POST to `/api/contact`.

## Environment

- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- FROM_EMAIL (the email shown as the sender)
- TO_EMAIL (destination address where you receive messages)
- Or use `SENDGRID_API_KEY` (uncommented) to send via SendGrid

## Endpoint

POST /api/contact

Body (JSON):

{
  "name": "Alice",
  "email": "alice@example.com",
  "subject": "Question about pricing",
  "message": "Hello! I want more info..."
}

Response: { ok: true }

## Testing locally without SMTP

If you don't have SMTP credentials yet, the server will automatically create a Nodemailer/Ethereal test account when no SMTP or SendGrid credentials are present. Ethereal provides a web preview URL for messages — useful for local testing.

Steps:

1. Start the server without editing `.env`:

```bash
cd server
npm install
npm start
```

2. Send a message from the site contact form. The server response will include `previewUrl` — open that URL in your browser to see the test email.

3. For production, set SMTP credentials or a SendGrid API key in `.env` and restart the server.

