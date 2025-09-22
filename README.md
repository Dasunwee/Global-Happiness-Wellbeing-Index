# Global Happiness & Wellbeing Index 🌍

A comprehensive platform for tracking and analyzing global happiness and wellbeing metrics across different cities worldwide. The application integrates multiple APIs to provide insights on air quality, weather conditions, and population density to calculate wellbeing scores.

## 🚀 Live Demo

Deploy this application to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dasunwee/Global-Happiness-Wellbeing-Index)

## 📋 Features

- **City Search & Analysis**: Search for cities worldwide and get comprehensive wellbeing data
- **Wellbeing Score Calculation**: Combines air quality, weather, and population metrics
- **User Authentication**: Google OAuth integration for personalized experience
- **Data Persistence**: Save and track your favorite cities
- **Leaderboard**: Global rankings of cities by wellbeing score
- **Responsive Design**: Modern, mobile-friendly interface

## 🏗️ Architecture

- **Frontend**: Vanilla HTML, CSS, JavaScript with Chart.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with Google OAuth 2.0
- **External APIs**: 
  - OpenWeatherMap (Weather data)
  - RapidAPI GeoDB (City information)
  - OpenAQ (Air quality data)

## 🌐 Vercel Deployment

### Quick Deploy

The easiest way to deploy is using the Vercel deploy button above, or follow these steps:

### Manual Deployment Steps

1. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to your Vercel account
   vercel login
   
   # Deploy
   vercel
   ```

2. **Configure Environment Variables in Vercel:**
   - Go to your project dashboard on Vercel
   - Navigate to Settings > Environment Variables
   - Add all required environment variables from your `.env.example` file
   
   **Required Variables for Production:**
   ```
   MONGODB_URI
   OPENWEATHER_API_KEY
   RAPIDAPI_KEY
   OPENAQ_API_KEY
   GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET
   JWT_SECRET
   API_KEY
   SESSION_SECRET
   NODE_ENV=production
   ```

3. **Update OAuth Settings:**
   - In your Google Cloud Console
   - Add your Vercel domain to authorized origins
   - Update redirect URI to: `https://your-app.vercel.app/auth/google/callback`

## 🔧 Local Development

1. **Clone and install:**
   ```bash
   git clone https://github.com/Dasunwee/Global-Happiness-Wellbeing-Index.git
   cd Global-Happiness-Wellbeing-Index
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Fill in your API keys and database URL
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## 🛠️ API Keys Setup

You'll need API keys from:
- [OpenWeatherMap](https://openweathermap.org/api)
- [RapidAPI GeoDB](https://rapidapi.com/wirefreethought/api/geodb-cities)
- [OpenAQ](https://docs.openaq.org/)
- [Google Cloud Console](https://console.cloud.google.com/) (for OAuth)
- [MongoDB Atlas](https://www.mongodb.com/atlas)

See `.env.example` for the complete list of required variables.

## 🗂️ Project Structure

```
├── client/           # Frontend files (HTML, CSS, JS)
├── server/          # Backend Express.js application
│   ├── auth/        # Passport.js authentication
│   ├── models/      # Mongoose database models
│   ├── routes/      # API route handlers
│   └── server.js    # Express server entry point
├── vercel.json      # Vercel deployment configuration
└── package.json     # Root dependencies for deployment
```

## 📊 Wellbeing Score Calculation

The wellbeing score combines three key metrics:

- **Air Quality (40%)**: Based on PM2.5, PM10, NO2, SO2, O3, CO levels
- **Temperature (30%)**: Optimal range scoring for human comfort  
- **Population Density (30%)**: Lower density generally = higher livability

Each component is scored 0-100, then weighted and combined for the final score.

---

Made with ❤️ for global wellbeing awareness