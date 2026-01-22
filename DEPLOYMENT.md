# Deployment Instructions

This application is ready to be deployed live. Follow these steps to set it up:

## 1. Database Setup
The app requires a PostgreSQL database for permanent storage of leads.

- **Replit**: If you are using Replit, go to the **Tools** section and select **Postgres**. This will automatically provision a database and set the `DATABASE_URL` environment variable.
- **Other Providers**: If using another provider (like Supabase, Render, or Neon), you must set the `DATABASE_URL` environment variable manually.

## 2. Environment Variables
Set the following environment variables in your deployment platform:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Your PostgreSQL connection string. |
| `ADMIN_PASSWORD` | The password required to access the `/admin` dashboard. |
| `NODE_ENV` | Set to `production`. |

## 3. Deployment Steps
1. Push your code to your deployment platform.
2. Ensure the build command is set to: `npm run build`
3. Ensure the start command is set to: `npm start` (or `node dist/index.cjs` as configured in `.replit`)

## 4. Initial Database Migration
Once deployed, you need to push the schema to the database. You can do this by running:
```bash
npm run db:push
```
(On Replit, you can run this in the Shell tab).

## 5. Accessing Admin Dashboard
1. Navigate to `/admin` on your live site.
2. Click **Login** and enter the `ADMIN_PASSWORD` you configured.
