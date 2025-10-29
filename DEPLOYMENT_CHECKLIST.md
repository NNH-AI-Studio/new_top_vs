# Production Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
Ensure all environment variables are set correctly in your `.env` file:

\`\`\`env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

**Where to find these:**
- Go to your Supabase Dashboard
- Select your project
- Click on "Settings" → "API"
- Copy the "Project URL" and "anon public" key

### 2. Database Migrations
All migrations have been applied:
- ✅ Comparisons system (categories, comparisons, ratings, comments, search_logs)
- ✅ Favorites system
- ✅ Admin authentication system
- ✅ Admin content management policies

### 3. Build Process
\`\`\`bash
npm run build
\`\`\`
Status: ✅ Build completed successfully

## 🔐 Admin Setup (First Time Only)

Before going live, you MUST create your first admin account. Follow these steps:

### Option 1: Via Supabase Dashboard (Recommended)

1. **Create Auth User**
   - Supabase Dashboard → Authentication → Users
   - Click "Add User"
   - Enter your email and password
   - Copy the generated user ID

2. **Add to Admins Table**
   - Supabase Dashboard → Table Editor → admins
   - Click "Insert" → "Insert row"
   - Paste the user ID
   - Enter your email
   - Set role to "admin"
   - Set is_active to true
   - Save

### Option 2: Via SQL Editor

Run this SQL (update email and password):

\`\`\`sql
DO $$
DECLARE
  new_user_id uuid;
  user_email text := 'your-email@example.com';  -- CHANGE THIS
  user_password text := 'YourStrongPassword123!'; -- CHANGE THIS
BEGIN
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
    raw_user_meta_data
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
    '{}'::jsonb
  ) RETURNING id INTO new_user_id;

  INSERT INTO admins (id, email, role, is_active)
  VALUES (new_user_id, user_email, 'admin', true);

  RAISE NOTICE 'Admin created with ID: %', new_user_id;
END $$;
\`\`\`

## 🚀 Deployment to Bolt

### Step 1: Verify Build
\`\`\`bash
npm run build
\`\`\`
- The `dist/` folder contains your production-ready files
- All assets are optimized and bundled

### Step 2: Connect Your Domain

1. **In Bolt Dashboard:**
   - Navigate to your project
   - Go to "Settings" or "Domains"
   - Click "Add Custom Domain"
   - Enter your domain name (e.g., `yourdomain.com`)

2. **In Your Domain Registrar (e.g., GoDaddy, Namecheap):**
   - Add DNS records as shown in Bolt
   - Typically:
     - Type: `A` Record
     - Name: `@` (for root domain) or `www`
     - Value: The IP address provided by Bolt
     - OR use CNAME record pointing to Bolt's URL

3. **Wait for DNS Propagation:**
   - Can take 5 minutes to 48 hours
   - Usually completes within 1-2 hours
   - Check status in Bolt dashboard

### Step 3: SSL Certificate
- Bolt automatically provisions SSL certificates
- Your site will be accessible via HTTPS
- No action needed on your part

### Step 4: Test Deployment

Once DNS is propagated, test these URLs:

1. **Homepage:**
   - `https://yourdomain.com`
   - Should load without errors

2. **Admin Login:**
   - `https://yourdomain.com/admin-login.html`
   - Login with your admin credentials
   - Verify you can access the dashboard

3. **Language Pages:**
   - `https://yourdomain.com/en/index.html`
   - `https://yourdomain.com/ar/index.html`
   - Both should load correctly

4. **Comparison Pages:**
   - Test a few comparison pages
   - Verify favorites work
   - Check rating system
   - Test comments submission

## 🔍 Post-Deployment Testing

### Test Admin Features
- ✅ Login to admin panel
- ✅ View dashboard statistics
- ✅ Create a new comparison
- ✅ Moderate comments
- ✅ View categories
- ✅ Logout and login again

### Test Public Features
- ✅ Search functionality
- ✅ Language switching
- ✅ Favorites/bookmarks
- ✅ Rating comparisons
- ✅ Submitting comments
- ✅ Responsive design on mobile
- ✅ Page loading speed

### Test SEO
- ✅ View page source, check meta tags
- ✅ Verify Open Graph tags
- ✅ Check structured data (Schema.org)
- ✅ Test social media sharing

## 📊 Monitoring & Maintenance

### Supabase Dashboard
Monitor these regularly:
- **Database**: Table Editor to view data
- **Authentication**: Active users and login attempts
- **API**: Request counts and performance
- **Storage**: If using file uploads in future

### Performance Metrics
- Page load times
- User engagement
- Most viewed comparisons
- Search queries and results

### Regular Tasks
- Review and moderate new comments
- Monitor admin activity logs
- Check for spam or abuse
- Update content regularly
- Back up database (Supabase does this automatically)

## 🔒 Security Best Practices

### Implemented Security Features
- ✅ Row Level Security (RLS) on all tables
- ✅ Admin authentication with Supabase Auth
- ✅ Secure password hashing
- ✅ HTTPS enabled via SSL certificate
- ✅ Environment variables for sensitive data
- ✅ Input validation and sanitization (DOMPurify)

### Ongoing Security
- Keep Supabase project updated
- Regularly review admin access
- Monitor for suspicious activity
- Use strong passwords
- Consider enabling 2FA for admin accounts

## 🐛 Troubleshooting

### Build Errors
\`\`\`bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
\`\`\`

### Database Connection Issues
- Verify `.env` variables are correct
- Check Supabase project is active
- Test connection in Supabase dashboard

### Admin Login Problems
- Verify user exists in `auth.users`
- Check user ID matches in `admins` table
- Ensure `is_active` is true
- Try password reset in Supabase dashboard

### Domain Not Loading
- Check DNS propagation: `dig yourdomain.com`
- Verify DNS records in registrar
- Wait longer (up to 48 hours)
- Check Bolt dashboard for status

## 📞 Support Resources

### Documentation
- Supabase Docs: https://supabase.com/docs
- Vite Docs: https://vitejs.dev
- Bolt Support: Check Bolt dashboard

### Getting Help
1. Check browser console for errors
2. Review Supabase logs
3. Verify all migrations applied
4. Test in incognito/private mode
5. Clear browser cache

---

## 🎉 You're Ready to Launch!

Your comparison website is now production-ready with:
- ✅ Dynamic content management system
- ✅ Secure admin authentication
- ✅ Bilingual support (EN/AR)
- ✅ SEO optimization
- ✅ User engagement features (ratings, comments, favorites)
- ✅ Responsive design
- ✅ Production-grade security

**Next Steps:**
1. Create your first admin account (if not done)
2. Connect your custom domain in Bolt
3. Test all features thoroughly
4. Start adding your comparison content
5. Share with the world!

Good luck with your launch! 🚀
