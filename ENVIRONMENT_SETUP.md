# Environment Variables and Secrets Setup

This document explains how to set up environment variables and secrets for the Daksha Landing application.

## Configuration Files

- `wrangler.jsonc.template` - Template configuration file (safe to commit)
- `wrangler.jsonc` - Actual configuration file (DO NOT commit - contains sensitive data)
- `setup-secrets.sh` - Script to set up Cloudflare secrets (DO NOT commit - contains sensitive data)

## Setup Instructions

### 1. Create your wrangler.jsonc file

Copy the template and fill in your actual values:

```bash
cp wrangler.jsonc.template wrangler.jsonc
```

Edit `wrangler.jsonc` and replace the placeholder values with your actual credentials:
- `YOUR_STACK_PROJECT_ID`
- `YOUR_STACK_PUBLISHABLE_CLIENT_KEY`

### 2. Set up Cloudflare Secrets

For sensitive data like API keys and secrets, use Cloudflare secrets instead of storing them in the config file:

```bash
# Set Stack secret server key
npx wrangler secret put STACK_SECRET_SERVER_KEY
```

### 3. Deploy

Once your secrets are set up, you can deploy normally:

```bash
npm run deploy
```

## Environment Variables vs Secrets

### Public Variables (safe in wrangler.jsonc)
- `NEXT_PUBLIC_STACK_PROJECT_ID` - Public project ID
- `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` - Public client key

### Secrets (use Cloudflare secrets)
- `STACK_SECRET_SERVER_KEY` - Server-side secret key

## Security Notes

1. **Never commit sensitive credentials** to version control
2. Use the `.gitignore` file to exclude sensitive files
3. Use Cloudflare secrets for sensitive data
4. The `wrangler.jsonc` file is ignored by git to prevent accidental commits
5. Share the template file (`wrangler.jsonc.template`) with your team instead

## For Team Members

When setting up the project:

1. Copy `wrangler.jsonc.template` to `wrangler.jsonc`
2. Get the actual credential values from your team lead
3. Fill in the template with real values
4. Set up the Cloudflare secrets using the commands above
