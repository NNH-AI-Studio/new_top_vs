# Quick Start Guide - VS Hub

## Your Website Is Production Ready! 🎉

Everything is set up and working. Here's what you need to do to launch:

---

## Step 1: Create Your Admin Account (5 minutes)

### Option A: Supabase Dashboard (Easiest)

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Authentication** → **Users** → **Add User**
4. Enter your email and password
5. Copy the user ID that was created
6. Click **Table Editor** → **admins** → **Insert row**
7. Paste the ID, enter your email, set role to "admin", set is_active to true
8. Click Save

### Option B: Run SQL

1. Go to **SQL Editor** in Supabase
2. Run this code (change email and password):

\`\`\`sql
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  INSERT INTO auth.users (
    instance_id, id, aud, role, email,
    encrypted_password, email_confirmed_at,
    created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(), 'authenticated', 'authenticated',
    'your-email@example.com',  -- CHANGE THIS
    crypt('YourPassword123!', gen_salt('bf')),  -- CHANGE THIS
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb
  ) RETURNING id INTO new_user_id;

  INSERT INTO admins (id, email, role, is_active)
  VALUES (new_user_id, 'your-email@example.com', 'admin', true);
END $$;
\`\`\`

---

## Step 2: Connect Your Domain in Bolt (10 minutes)

1. In Bolt dashboard, go to your project settings
2. Find "Custom Domain" or "Domains"
3. Add your domain name
4. Bolt will give you DNS records
5. Go to your domain registrar (GoDaddy, Namecheap, etc.)
6. Add the DNS records Bolt provided
7. Wait for DNS propagation (5 min - 48 hours, usually 1-2 hours)
8. Bolt will automatically set up SSL (HTTPS)

---

## Step 3: Test Everything (5 minutes)

### Test Admin Login
1. Go to `https://yourdomain.com/admin-login.html`
2. Login with your email and password
3. You should see the admin dashboard

### Test Admin Features
- Create a comparison
- Approve a comment
- View statistics

### Test Public Features
- Visit homepage
- Search for comparisons
- Switch languages (EN/AR)
- Add to favorites
- Rate a comparison

---

## What's Included

✅ **Dynamic Content Management**
- Create/edit comparisons from admin panel
- Category management
- Comment moderation
- Rating system

✅ **Admin System**
- Secure authentication with Supabase
- Protected admin panel
- Content management tools

✅ **Bilingual Support**
- English and Arabic
- Easy language switching
- SEO optimized for both

✅ **SEO Optimization**
- Dynamic meta tags
- Open Graph for social media
- Schema.org structured data
- Sitemap

✅ **User Features**
- Favorites/Bookmarks
- 5-star rating system
- Comments with moderation
- Smart search

✅ **Security**
- Row Level Security (RLS)
- Secure authentication
- HTTPS enabled
- Input sanitization

---

## Important Files

- **ADMIN_SETUP.md** - Detailed admin setup guide
- **DEPLOYMENT_CHECKLIST.md** - Complete deployment checklist
- **READY_FOR_PRODUCTION_AR.md** - Arabic version of this guide
- **.env** - Environment variables (keep this secret!)

---

## Need Help?

### Admin Login Issues
- Check user exists in `auth.users` table
- Verify ID matches in `admins` table
- Ensure `is_active` is true
- Try password reset in Supabase

### Domain Not Working
- Wait longer (DNS can take up to 48 hours)
- Check DNS records in your registrar
- Verify in Bolt dashboard

### Database Issues
- Check `.env` file has correct Supabase credentials
- Test connection in Supabase dashboard
- Review migrations in Supabase

---

## You're All Set! 🚀

Your comparison website is ready to launch with:
- Complete admin control panel
- Bilingual content support
- SEO optimization
- User engagement features
- Production-grade security

**Now go create your first admin account and connect your domain!**

Good luck with your launch! 🎉
