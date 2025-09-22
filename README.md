# Global Wellbeing Index App

## Overview

The Global Wellbeing Index App is an interactive web application that allows users to search for cities worldwide and calculate a wellbeing score based on key factors such as air quality, weather comfort, and population density. The app features a modern, animated user interface with particle effects, smooth transitions, and responsive design. Users can log in via Google to save their searches, view personal records, and explore a leaderboard of top liveable cities.

The wellbeing score is computed using a weighted formula:
- Air Quality: 40%
- Weather Comfort (temperature): 30%
- Population Density: 30%

Data is sourced from external APIs like GeoDB for city information, OpenAQ for air quality, and OpenWeatherMap for weather details.

## Features

- **City Search with Suggestions**: Real-time search with auto-complete suggestions, including population and region details.
- **Wellbeing Score Calculation**: Instant computation of scores with breakdowns for air quality, temperature, and population.
- **Interactive Charts**: Doughnut chart visualizing score components using Chart.js.
- **User Authentication**: Google OAuth for login/logout.
- **Saved Records**: Authenticated users can save city data and view their search history.
- **Leaderboard**: Displays top 5 liveable cities (predefined based on global indices) with clickable entries to view details.
- **Animations & Effects**: Particle background, ripple effects on buttons, floating cards, and smooth transitions for enhanced UX.
- **Modals & Loading States**: Error/success modals and animated loading indicators.
- **Responsive Design**: Mobile-friendly with touch support and performance optimizations.

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**: Chart.js for charts
- **Fonts**: Inter (via Google Fonts)
- **APIs**: 
  - GeoDB (city search and population)
  - OpenAQ (air quality)
  - OpenWeatherMap (weather)
- **Backend** (assumed, based on API endpoints): Node.js/Express with Google OAuth, database for records (e.g., MongoDB)
- **Other**: Custom animation controllers for particles, ripples, and transitions

## Installation

1. **Clone the Repository**:
   
```git clone https://github.com/Dasunwee/Global-Happiness-Wellbeing-Index.git```

```cd global-wellbeing-index```

2. **Frontend Setup**:
- The frontend is in `index.html`, `styles.css`, and `app.js`.
- No build tools required; can be served statically.

3. **Backend Setup** (if applicable):
- Install dependencies: `npm install`
- Set environment variables (e.g., `.env` file):
API_KEY=your_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id
DATABASE_URL=your_db_connection_string
text- Start the server: `npm start` 

4. **Frontend Setup**:
- The frontend is in `index.html`, `styles.css`, and `app.js`.
- No build tools required; can be served statically.

5. **Backend Setup** (if applicable):
- Install dependencies: `npm install`
- Set environment variables (e.g., `.env` file):
