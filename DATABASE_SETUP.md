# Database Setup and User Sync

This document explains how to set up the database and user synchronization for the Daksha application.

## Quick Setup

1. **Environment Setup**
   ```bash
   npm run setup
   ```
   This will create a `.env` file from `.env.example`. Update the values as needed.

2. **Database Connection Test**
   ```bash
   npm run db:test
   ```
   This will test your database connection and provide helpful error messages.

3. **Database Schema Sync**
   ```bash
   npm run db:sync
   ```
   This will create/update database tables to match the schema.

## Database Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database (ensure special characters are URL-encoded)
DATABASE_URL="postgresql://postgres:your_password@your_host:5432/your_db"

# StackAuth
NEXT_PUBLIC_STACK_PROJECT_ID=your_stack_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_stack_publishable_key
STACK_SECRET_SERVER_KEY=your_stack_secret_key

# OpenAI (for chat functionality)
OPENAI_API_KEY=your_openai_api_key
```

### Password URL Encoding

If your database password contains special characters, they must be URL-encoded:

- `@` becomes `%40`
- `#` becomes `%23`
- `&` becomes `%26`
- `+` becomes `%2B`

**Example:**
- Original: `Prince@4#`
- URL-encoded: `Prince%404%23`

## User Schema

The enhanced user table includes:

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,                    -- StackAuth user ID
  email TEXT,                            -- User's email
  display_name TEXT,                     -- User's display name
  profile_image_url TEXT,                -- Profile picture URL
  primary_email TEXT,                    -- Primary email address
  primary_email_verified TEXT,           -- Email verification status
  client_metadata JSONB,                 -- Client-side metadata
  server_metadata JSONB,                 -- Server-side metadata
  oauth_providers JSONB,                 -- OAuth provider information
  created_at TIMESTAMPTZ DEFAULT NOW(),  -- Account creation time
  updated_at TIMESTAMPTZ DEFAULT NOW(),  -- Last update time
  last_seen_at TIMESTAMPTZ              -- Last activity time
);
```

## Automatic User Sync

The application automatically syncs user data from StackAuth to the database:

### How it Works

1. **UserSyncProvider**: Added to the root layout, monitors authentication state
2. **useUserSync Hook**: Automatically syncs user data when a user logs in
3. **Sync API**: `/api/auth/sync-user` handles the actual database synchronization
4. **AuthGuard**: Uses the sync hook to ensure user data is always up-to-date

### Manual Sync

You can also manually trigger user sync by calling:

```typescript
const response = await fetch('/api/auth/sync-user', { method: 'POST' });
```

## Troubleshooting

### EHOSTUNREACH Error

This error indicates the database server is unreachable:

1. Check if your database server is running
2. Verify the host/IP address in DATABASE_URL
3. Ensure network connectivity
4. Check firewall settings

### Password Authentication Failed

1. Verify your username and password
2. Check if special characters are properly URL-encoded
3. Ensure the database exists
4. Check user permissions

### Connection Timeout

1. Check if the database server is responding
2. Verify the port number (usually 5432 for PostgreSQL)
3. Check network latency

## Scripts

- `npm run setup` - Initialize environment configuration
- `npm run db:test` - Test database connectivity
- `npm run db:sync` - Sync database schema
- `npm run db:migrate` - Run database migrations

## Files

- `/src/db/schema.ts` - Database schema definitions
- `/src/db/sync.ts` - Schema synchronization functions
- `/src/db/client.ts` - Database client configuration
- `/src/lib/user-sync.ts` - User synchronization logic
- `/src/hooks/use-user-sync.tsx` - React hook for automatic user sync
- `/src/components/auth/UserSyncProvider.tsx` - Global user sync provider