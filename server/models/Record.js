const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    // User information
    userId: {
        type: String,
        required: true,
        index: true
    },
    userEmail: {
        type: String,
        required: true
    },
    
    // Location data
    city: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    
    // Population data (from GeoDB)
    population: {
        type: Number,
        required: true
    },
    populationDensity: {
        type: Number,
        default: null
    },
    
    // Air quality data (from OpenAQ)
    airQuality: {
        pm25: {
            type: Number,
            default: null
        },
        pm10: {
            type: Number,
            default: null
        },
        no2: {
            type: Number,
            default: null
        },
        so2: {
            type: Number,
            default: null
        },
        o3: {
            type: Number,
            default: null
        },
        co: {
            type: Number,
            default: null
        },
        lastUpdated: {
            type: Date,
            default: null
        },
        source: {
            type: String,
            default: null
        }
    },
    
    // Weather data (from OpenWeatherMap)
    weather: {
        temperature: {
            type: Number,
            required: true
        },
        humidity: {
            type: Number,
            required: true
        },
        pressure: {
            type: Number,
            default: null
        },
        visibility: {
            type: Number,
            default: null
        },
        windSpeed: {
            type: Number,
            default: null
        },
        description: {
            type: String,
            default: null
        }
    },
    
    // Calculated scores
    wellbeingScore: {
        total: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        airQualityScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        temperatureScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        populationScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        }
    },
    
    // Metadata
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    
    // API response raw data (for debugging)
    rawData: {
        geodb: mongoose.Schema.Types.Mixed,
        openaq: mongoose.Schema.Types.Mixed,
        openweather: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
});

// Indexes for efficient queries
recordSchema.index({ userId: 1, createdAt: -1 });
recordSchema.index({ city: 1, country: 1 });
recordSchema.index({ 'wellbeingScore.total': -1 });

// Virtual for formatted location
recordSchema.virtual('location').get(function() {
    return `${this.city}, ${this.country}`;
});

// Method to update wellbeing score
recordSchema.methods.calculateWellbeingScore = function() {
    // Air Quality Score (40%) - Lower PM2.5 is better
    let airScore = 0;
    if (this.airQuality.pm25 !== null) {
        // WHO guideline: PM2.5 annual mean should not exceed 5 μg/m³
        // Scale: 0-5 = 100, 5-15 = 80, 15-25 = 60, 25-35 = 40, 35+ = 20
        if (this.airQuality.pm25 <= 5) airScore = 100;
        else if (this.airQuality.pm25 <= 15) airScore = 80;
        else if (this.airQuality.pm25 <= 25) airScore = 60;
        else if (this.airQuality.pm25 <= 35) airScore = 40;
        else airScore = 20;
    } else {
        airScore = 50; // Default if no data
    }
    
    // Temperature Score (30%) - Ideal around 20-25°C
    const idealTemp = 22.5;
    const tempDiff = Math.abs(this.weather.temperature - idealTemp);
    let tempScore = Math.max(0, 100 - (tempDiff * 3)); // Decrease by 3 points per degree
    
    // Population Score (30%) - Less crowded is better
    let popScore = 100;
    if (this.populationDensity) {
        // Scale based on population density (people per km²)
        if (this.populationDensity > 10000) popScore = 20;
        else if (this.populationDensity > 5000) popScore = 40;
        else if (this.populationDensity > 2000) popScore = 60;
        else if (this.populationDensity > 500) popScore = 80;
        else popScore = 100;
    } else {
        // Use total population as fallback
        if (this.population > 10000000) popScore = 20;
        else if (this.population > 5000000) popScore = 40;
        else if (this.population > 1000000) popScore = 60;
        else if (this.population > 100000) popScore = 80;
        else popScore = 100;
    }
    
    // Calculate weighted total
    const totalScore = (airScore * 0.4) + (tempScore * 0.3) + (popScore * 0.3);
    
    // Update the record
    this.wellbeingScore = {
        total: Math.round(totalScore),
        airQualityScore: Math.round(airScore),
        temperatureScore: Math.round(tempScore),
        populationScore: Math.round(popScore)
    };
    
    return this.wellbeingScore;
};

module.exports = mongoose.model('Record', recordSchema);