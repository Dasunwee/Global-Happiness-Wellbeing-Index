# Vercel Deployment Guide

This guide will help you deploy the Global Happiness & Wellbeing Index application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your repository should be on GitHub
3. **API Keys**: Obtain all required API keys (see README.md)
4. **MongoDB Database**: Set up a MongoDB Atlas cluster

## Quick Deploy

### Option 1: One-Click Deploy
Click the deploy button in the main README.md or use this link:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dasunwee/Global-Happiness-Wellbeing-Index)

### Option 2: Manual Deploy

1. **Fork the repository** to your GitHub account
2. **Import to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your forked repository
   - Vercel will automatically detect the project settings

## Environment Variables Setup

During deployment, add these environment variables in Vercel dashboard:

### Required Variables
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
OPENWEATHER_API_KEY=your_openweather_api_key
RAPIDAPI_KEY=your_rapidapi_key
OPENAQ_API_KEY=your_openaq_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_random_jwt_secret
API_KEY=your_random_api_key
SESSION_SECRET=your_random_session_secret
```

### Optional Variables
```
NODE_ENV=production
FRONTEND_URL=https://your-custom-domain.com
```

## Post-Deployment Configuration

### 1. Google OAuth Setup
After deployment, you need to update your Google OAuth application:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Navigate to "APIs & Services" > "Credentials"
4. Edit your OAuth 2.0 client ID
5. Add your Vercel domain to authorized origins:
   - `https://your-app-name.vercel.app`
6. Add callback URLs:
   - `https://your-app-name.vercel.app/auth/google/callback`

### 2. MongoDB Atlas Network Access
Ensure MongoDB Atlas allows connections from anywhere:
1. Go to MongoDB Atlas dashboard
2. Navigate to "Network Access"
3. Add IP address `0.0.0.0/0` (or use Vercel's IP ranges)

### 3. Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Navigate to "Settings" > "Domains"
3. Add your custom domain
4. Update FRONTEND_URL environment variable
5. Update Google OAuth settings with your custom domain

## Troubleshooting

### Common Issues

1. **"API key required" errors**
   - Ensure all environment variables are set in Vercel dashboard
   - Check that variable names match exactly

2. **OAuth callback errors**
   - Verify Google OAuth settings include correct domains
   - Check that callback URLs are properly configured

3. **Database connection issues**
   - Verify MongoDB connection string
   - Check network access settings in MongoDB Atlas
   - Ensure database user has proper permissions

4. **CORS errors**
   - The app is configured to allow Vercel domains automatically
   - If using custom domain, add it to FRONTEND_URL environment variable

5. **Function timeout errors**
   - API calls may timeout on free tier
   - Consider upgrading to Pro plan for longer function execution time

### Logs and Debugging

1. **View deployment logs**:
   - Go to your project in Vercel dashboard
   - Click on "Functions" tab
   - View real-time logs for API endpoints

2. **Check build logs**:
   - In project dashboard, click on deployment
   - View build and function logs

## Performance Optimization

### Recommended Settings

1. **Environment Variables**:
   - Set `NODE_ENV=production`
   - Configure proper database connection pooling

2. **Function Regions**:
   - Deploy to regions close to your users
   - Configure in `vercel.json` if needed

3. **Caching**:
   - API responses are automatically cached
   - Static assets served via Vercel CDN

## Support

If you encounter issues:
1. Check Vercel documentation
2. Review function logs in Vercel dashboard
3. Open an issue in the GitHub repository

## Next Steps

After successful deployment:
1. Test all functionality (search, save, leaderboard)
2. Monitor function execution and costs
3. Set up custom domain if desired
4. Consider upgrading to Pro plan for production use