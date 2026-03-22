# Deployment Guide - Cloudflare Pages

This guide walks you through deploying the Image Background Remover to Cloudflare Pages.

## 🎯 Why Cloudflare Pages?

- ✅ **Free tier**: 100GB bandwidth/month, unlimited requests
- ✅ **Automatic HTTPS**: SSL certificates included
- ✅ **Global CDN**: Fast delivery worldwide
- ✅ **Zero config**: Auto-detects Next.js static exports
- ✅ **Custom domains**: Free SSL on your domain
- ✅ **Preview deployments**: Test before production

## 📋 Prerequisites

1. GitHub account with the repository pushed
2. Cloudflare account (free): https://dash.cloudflare.com/sign-up
3. Remove.bg API Key: https://www.remove.bg/api

## 🚀 Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
cd /root/.openclaw/workspace/image-background-remover

# Configure git user (if not already done)
git config user.name "liaoliu51"
git config user.email "254252556@qq.com"

# Add all files
git add -A

# Commit
git commit -m "Complete Next.js + Tailwind CSS MVP implementation"

# Push to GitHub
git push origin main
```

### Step 2: Connect to Cloudflare Pages

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Sign in to your account

2. **Navigate to Pages**
   - Click "Workers & Pages" in the left sidebar
   - Click "Create application"
   - Select "Pages" tab
   - Click "Connect to Git"

3. **Select Repository**
   - Choose your GitHub account
   - Find `liaoliu51/image-background-remover`
   - Click "Begin setup"

### Step 3: Configure Build Settings

**Build configuration:**

| Setting | Value |
|---------|-------|
| **Framework preset** | Next.js |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | (leave blank) |

**Environment variables (optional):**

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_REMOVEBG_API_KEY` | Your API key (optional) |

> ⚠️ **Note**: API key is optional - users can configure their own in the UI

### Step 4: Deploy

1. Click **"Save and Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Cloudflare will provide a `*.pages.dev` URL

### Step 5: Custom Domain (Optional)

1. Go to your Pages project in Cloudflare Dashboard
2. Click "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter your domain (e.g., `bgremover.yourdomain.com`)
5. Follow DNS configuration instructions
6. SSL certificate is automatically provisioned

## 🔧 Post-Deployment

### Test Your Deployment

1. Visit your deployed URL
2. Configure API Key (if not set as env var)
3. Upload a test image
4. Verify background removal works
5. Download the result

### Monitor Usage

- **Cloudflare Analytics**: Dashboard → Pages → Your Project → Analytics
- **Remove.bg Usage**: https://www.remove.bg/dashboard

### Update Deployment

Every push to the `main` branch will automatically trigger a new deployment:

```bash
# Make changes
git add -A
git commit -m "Update feature"
git push origin main

# Cloudflare Pages will auto-deploy
```

## 🌍 Environment Variables

### Production Environment Variables

Set these in Cloudflare Pages Dashboard:

1. Go to your Pages project
2. Click "Settings" → "Environment variables"
3. Add variables:

```
NEXT_PUBLIC_REMOVEBG_API_KEY=your_api_key_here
```

4. Click "Save"

### Multiple Environments

Cloudflare Pages supports preview and production environments:

- **Production**: Deploys from `main` branch
- **Preview**: Deploys from pull requests

Configure different environment variables for each:

1. Settings → Environment variables
2. Select environment (Production/Preview)
3. Add variables specific to that environment

## 📊 Performance Optimization

### Enable Compression

Cloudflare automatically compresses static assets. No configuration needed.

### Cache Control

Next.js static export includes optimal cache headers by default.

### Image Optimization

Since we're using static export, images are served as-is. Consider:

- Compress images before upload
- Use WebP format for smaller file sizes
- Implement lazy loading for large galleries

## 🔒 Security

### CORS

The app calls Remove.bg API directly from the browser. No CORS issues since:

- Remove.bg API supports browser requests
- API key is provided in headers (not exposed in code)

### API Key Security

- ✅ Keys stored in browser localStorage (user's device)
- ✅ Keys never committed to code
- ✅ Optional: Set default key in environment variable (server-side)

### Rate Limiting

Remove.bg API has built-in rate limiting:

- Free tier: 50 images/month
- Pay-as-you-go: $0.01-0.02/image

Monitor usage at: https://www.remove.bg/dashboard

## 🐛 Troubleshooting

### Build Fails

**Error: Module not found**

```bash
# Solution: Ensure all dependencies are installed
npm install
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push
```

### Deployment Shows Blank Page

**Check browser console for errors**

Common issues:
- Missing environment variables
- API key not configured
- CORS errors (check Remove.bg API access)

### Images Not Processing

**Verify API Key:**
1. Check API key is valid: https://www.remove.bg/dashboard
2. Ensure quota is not exceeded
3. Check browser console for API errors

### Custom Domain Not Working

**DNS Propagation:**
- Wait up to 24 hours for DNS changes
- Check DNS settings in Cloudflare Dashboard
- Ensure SSL/TLS is set to "Full" or "Full (strict)"

## 📈 Analytics

### Cloudflare Web Analytics

Enable in Cloudflare Dashboard:
1. Go to Pages project
2. Click "Analytics"
3. View:
   - Page views
   - Unique visitors
   - Bandwidth usage
   - Geographic distribution

### Custom Analytics

Add Google Analytics or similar:

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'YOUR_GA_ID');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 💰 Cost Breakdown

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Cloudflare Pages** | 100GB bandwidth/mo | $5/100GB additional |
| **Remove.bg API** | 50 images/mo | $0.01-0.02/image |
| **Custom Domain** | - | ~$10-15/year |

**Estimated monthly cost for 500 images:**
- Cloudflare: $0 (within free tier)
- Remove.bg: ~$9 (450 images × $0.02)
- Domain: ~$1 (amortized)
- **Total: ~$10/month**

## 🎉 Success!

Your Image Background Remover is now live! Share your URL and start removing backgrounds.

**Next Steps:**
1. Share on social media
2. Collect user feedback
3. Monitor API usage
4. Plan feature enhancements

---

**Need Help?**
- Cloudflare Docs: https://developers.cloudflare.com/pages/
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: https://github.com/liaoliu51/image-background-remover/issues
