# Admin Setup Guide

## Overview
Your comparison website now has a complete production-ready authentication system. This guide will help you set up your first admin account.

## Prerequisites
- Supabase project is already connected
- Database migrations have been applied
- The website is deployed or running locally

## Step 1: Create Your Admin Account

You have two options to create your first admin account:

### Option A: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project

2. **Create an Auth User**
   - Click on "Authentication" in the left sidebar
   - Click on "Users" tab
   - Click "Add User" button
   - Enter your email address
   - Enter a strong password
   - Click "Create User"
   - Copy the user ID (UUID) that was created

3. **Add User to Admins Table**
   - Click on "Table Editor" in the left sidebar
   - Select the "admins" table
   - Click "Insert" → "Insert row"
   - Fill in the fields:
     - `id`: Paste the user ID you copied earlier
     - `email`: Your email address (same as above)
     - `role`: Select "admin" or "super_admin"
     - `is_active`: Check the box (set to true)
   - Click "Save"

### Option B: Using SQL Editor

1. **Go to SQL Editor in Supabase Dashboard**
   - Click on "SQL Editor" in the left sidebar

2. **Run this SQL command** (replace with your email and password):

\`\`\`sql
-- Step 1: Create the auth user and get the ID
DO $$
DECLARE
  new_user_id uuid;
  user_email text := 'your-email@example.com';  -- CHANGE THIS
  user_password text := 'YourStrongPassword123!'; -- CHANGE THIS
BEGIN
  -- Create the user in auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    user_email,
    crypt(user_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    false,
    '',
    '',
    '',
    ''
  ) RETURNING id INTO new_user_id;

  -- Add the user to admins table
  INSERT INTO admins (id, email, role, is_active)
  VALUES (new_user_id, user_email, 'admin', true);

  RAISE NOTICE 'Admin user created successfully with ID: %', new_user_id;
END $$;
\`\`\`

**Important:** Update the `user_email` and `user_password` values in the SQL above!

## Step 2: Login to Admin Panel

1. Navigate to: `https://your-domain.com/admin-login.html`
2. Enter your email and password
3. Click "Login to Dashboard"

You should now be redirected to the admin panel!

## Step 3: Security Recommendations

### 1. Change Your Password (Recommended)
After your first login, it's recommended to change your password using Supabase's password reset flow:

- Go to your admin profile (coming soon in the UI)
- Or use Supabase Dashboard → Authentication → Users → Click on your user → Reset Password

### 2. Enable Two-Factor Authentication (Optional)
For extra security, you can enable 2FA in your Supabase project:
- Go to Authentication → Providers → Enable "Phone Auth" or use an authenticator app

### 3. Keep Your Credentials Safe
- Never share your admin credentials
- Use a strong, unique password
- Consider using a password manager

## Troubleshooting

### "Access denied. You are not authorized as an admin."
- Verify that your user ID exists in the `admins` table
- Check that `is_active` is set to `true` in the admins table
- Make sure the `id` in the admins table matches your auth user ID exactly

### "Invalid email or password"
- Double-check your email and password
- Try resetting your password via Supabase Dashboard
- Verify the user exists in Authentication → Users

### Cannot access admin panel after login
- Check browser console for errors
- Verify Supabase environment variables are correct in `.env`
- Try logging out and logging back in

## Adding More Admins

To add additional admin users, repeat the steps above for each new admin:
1. Create auth user in Supabase
2. Add their ID to the admins table
3. They can now login using their credentials

## Admin Features

Once logged in, you can:
- ✅ View dashboard statistics
- ✅ Create and manage comparisons
- ✅ Moderate comments (approve/delete)
- ✅ View and manage categories
- ✅ Monitor user activity and ratings
- ✅ Track page views and engagement

## Next Steps

1. **Connect Your Domain**: Follow Bolt's guide to connect your custom domain
2. **Configure DNS**: Point your domain to your hosting
3. **SSL Certificate**: Ensure HTTPS is enabled (usually automatic)
4. **Test Everything**: Login and test all admin features
5. **Start Adding Content**: Create your first comparisons!

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Review Supabase logs in the Dashboard
3. Verify all environment variables are set correctly
4. Ensure all migrations have been applied successfully

---

**Your admin panel is now production-ready!** 🎉
