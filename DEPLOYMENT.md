# 🚀 Vercel Deployment Guide

This guide will help you deploy the Global Happiness & Wellbeing Index to Vercel in just a few minutes.

## Quick Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dasunwee/Global-Happiness-Wellbeing-Index)

Click the button above and follow these steps:

## 📋 Pre-Deployment Checklist

### 1. Get Required API Keys

Before deploying, gather these API keys (all free tiers available):

| Service | URL | Purpose | Required |
|---------|-----|---------|----------|
| MongoDB Atlas | https://www.mongodb.com/atlas | Database | ✅ Required |
| OpenWeatherMap | https://openweathermap.org/api | Weather data | ✅ Required |
| RapidAPI GeoDB | https://rapidapi.com/wirefreethought/api/geodb-cities | City data | ✅ Required |
| Google Cloud Console | https://console.cloud.google.com/ | OAuth login | ✅ Required |
| OpenAQ | https://docs.openaq.org/ | Air quality | ⚠️ Optional* |

*OpenAQ API may have rate limits; app will work without it but with limited air quality data.

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing one
3. Enable "Google+ API" 
4. Go to "Credentials" > "Create Credentials" > "OAuth 2.0 Client ID"
5. Choose "Web application"
6. Add authorized origins:
   - `https://your-app-name.vercel.app` (replace with your actual domain)
7. Add redirect URIs:
   - `https://your-app-name.vercel.app/auth/google/callback`
8. Save Client ID and Client Secret

## 🔧 Deployment Steps

### Step 1: Deploy to Vercel

1. Click the deploy button or go to [Vercel](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will automatically detect the configuration
4. Click "Deploy" (it will fail initially - this is expected!)

### Step 2: Configure Environment Variables

In your Vercel dashboard:

1. Go to your project
2. Click "Settings" tab  
3. Click "Environment Variables"
4. Add these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellbeing-db
OPENWEATHER_API_KEY=your_openweather_api_key
RAPIDAPI_KEY=your_rapidapi_key
OPENAQ_API_KEY=your_openaq_key_or_leave_empty
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=any_random_string_32_chars_long
API_KEY=100200300400555
SESSION_SECRET=another_random_string_32_chars
NODE_ENV=production
```

### Step 3: Redeploy

1. Go to "Deployments" tab
2. Click "..." menu on latest deployment
3. Click "Redeploy"
4. Wait for deployment to complete

### Step 4: Update OAuth Settings

Now that you have your live URL:

1. Go back to Google Cloud Console
2. Update your OAuth settings with the actual Vercel URL
3. Add to authorized origins: `https://your-actual-vercel-url.vercel.app`
4. Add to redirect URIs: `https://your-actual-vercel-url.vercel.app/auth/google/callback`

## ✅ Verify Deployment

1. Visit your Vercel URL
2. Try searching for a city (e.g., "London")
3. Test Google login functionality
4. Check that data saves properly

## 🚨 Troubleshooting

### Common Issues:

**"OAuth Error" or "Client ID not found"**
- Check Google OAuth settings
- Ensure client ID/secret are correct in Vercel environment variables
- Verify authorized origins and redirect URIs match your domain

**"Database connection failed"**
- Verify MongoDB Atlas connection string
- Check database user permissions
- Ensure IP whitelist includes 0.0.0.0/0 for Vercel

**"API Key errors"**
- Verify all API keys are correctly entered
- Check API key permissions and quotas
- OpenAQ is optional - app works without it

**"Internal Server Error"**
- Check Vercel function logs in dashboard
- Verify all environment variables are set
- Check API rate limits

### Getting Help

1. Check Vercel deployment logs
2. Verify all environment variables are set correctly
3. Test API keys individually
4. Check external service status pages

## 📊 Post-Deployment

### Performance Tips

1. **Monitor usage**: Check Vercel dashboard for function invocations
2. **Rate limiting**: Be aware of API quotas for external services
3. **Caching**: Consider adding caching for frequently accessed cities
4. **Database**: Monitor MongoDB Atlas usage

### Optional Enhancements

1. **Custom domain**: Add your own domain in Vercel settings
2. **Analytics**: Add Vercel Analytics for usage insights
3. **Error monitoring**: Consider adding Sentry for error tracking

---

🎉 **Congratulations!** Your Global Happiness & Wellbeing Index is now live!

Share your deployment and help others track global wellbeing! 🌍