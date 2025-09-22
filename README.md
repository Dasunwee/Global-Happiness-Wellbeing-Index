# Global Happiness & Wellbeing Index

A comprehensive platform for analyzing global happiness and wellbeing metrics across cities worldwide. This application aggregates data from multiple APIs to provide insights into air quality, weather conditions, and population statistics for cities globally.

## Features

- **City Search**: Search for cities worldwide using GeoDB API
- **Air Quality Analysis**: Real-time air quality data from OpenAQ API
- **Weather Information**: Current weather conditions from OpenWeatherMap API
- **Wellbeing Scoring**: Calculated wellbeing index based on multiple factors
- **User Authentication**: Google OAuth integration for personalized experiences
- **Data Persistence**: Save and track your searched cities
- **Leaderboard**: Compare cities globally based on wellbeing scores

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dasunwee/Global-Happiness-Wellbeing-Index)

## 📋 Environment Variables

Before deploying, you need to set up the following environment variables in your Vercel dashboard or `.env` file:

### Required API Keys
```env
# External APIs
OPENWEATHER_API_KEY=your_openweather_api_key
RAPIDAPI_KEY=your_rapidapi_key
OPENAQ_API_KEY=your_openaq_api_key

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Security Keys (generate random strings)
JWT_SECRET=your_random_jwt_secret
API_KEY=your_random_api_key
SESSION_SECRET=your_random_session_secret

# Optional
FRONTEND_URL=https://your-custom-domain.com
NODE_ENV=production
```

### How to Get API Keys

1. **OpenWeatherMap API**: Sign up at [OpenWeatherMap](https://openweathermap.org/api) for free weather data
2. **RapidAPI Key**: Create account at [RapidAPI](https://rapidapi.com/) and subscribe to GeoDB Cities API
3. **OpenAQ API**: Get your key at [OpenAQ](https://openaq.org/) for air quality data
4. **Google OAuth**: Set up OAuth in [Google Cloud Console](https://console.cloud.google.com/)
5. **MongoDB**: Use [MongoDB Atlas](https://www.mongodb.com/atlas) for cloud database

## 🛠️ Local Development

1. Clone the repository
```bash
git clone https://github.com/Dasunwee/Global-Happiness-Wellbeing-Index.git
cd Global-Happiness-Wellbeing-Index
```

2. Install dependencies
```bash
cd server && npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your actual API keys
```

4. Start the development server
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## 📁 Project Structure

```
├── client/                 # Frontend files
│   ├── index.html         # Main HTML file
│   ├── app.js            # Frontend JavaScript
│   └── styles.css        # CSS styles
├── server/                # Backend API
│   ├── auth/             # Authentication config
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── server.js         # Main server file
├── vercel.json           # Vercel deployment config
└── package.json          # Project dependencies
```

## 🔧 Deployment Configuration

The application is configured for serverless deployment on Vercel with:

- **Static Assets**: Client files served via Vercel's CDN
- **API Routes**: Serverless functions for backend endpoints
- **Environment Variables**: Secure handling of sensitive data
- **CORS**: Configured for Vercel domains
- **Database**: MongoDB Atlas for production

## 📊 Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with Google OAuth
- **Deployment**: Vercel Serverless Functions
- **APIs**: OpenWeatherMap, GeoDB, OpenAQ

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support or questions, please open an issue in the GitHub repository.