require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env' : '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('passport');
const path = require('path');


// Import routes and config
const apiRoutes = require('./routes/api');
require('./auth/passport-config')(passport);

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Allow inline scripts for development
    crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000', 
    'http://localhost:5500',
    // Allow Vercel deployment URLs
    /^https:\/\/.*\.vercel\.app$/,
    // Allow custom domain if provided
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        
        // Check if origin is allowed
        const isAllowed = allowedOrigins.some(allowed => {
            if (typeof allowed === 'string') return allowed === origin;
            return allowed.test(origin);
        });
        
        if (isAllowed) return callback(null, true);
        
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));

// Session configuration for OAuth
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
    name: 'sessionId', // Custom session name
    proxy: process.env.NODE_ENV === 'production' // Trust proxy in production
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from client directory
app.use(express.static(path.join(__dirname, '../client')));

// MongoDB connection
if (!process.env.MONGODB_URI) {
    console.warn('⚠️ MongoDB URI not provided. Database functionality will be disabled.');
} else {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // Add production-friendly options
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        bufferMaxEntries: 0, // Disable mongoose buffering
        bufferCommands: false, // Disable mongoose buffering
    })
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
        // Don't exit process in serverless environments
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    });

    mongoose.connection.on('connected', () => {
        console.log('✅ Mongoose connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
        console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('⚠️ Mongoose disconnected');
    });

    // Test database connection
    mongoose.connection.once('open', async () => {
        console.log('🔍 Testing database connection...');
        try {
            // Test if we can create a collection
            const collections = await mongoose.connection.db.listCollections().toArray();
            console.log('📊 Available collections:', collections.map(c => c.name));
            console.log('✅ Database connection test passed');
        } catch (error) {
            console.error('❌ Database connection test failed:', error);
        }
    });
}

// Routes
app.use('/api', apiRoutes);

// OAuth routes
app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to main page
        res.redirect('/?login=success');
    }
);

app.get('/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.redirect('/');
    });
});

app.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            authenticated: true,
            user: {
                id: req.user.googleId,
                name: req.user.displayName,
                email: req.user.email
            }
        });
    } else {
        res.json({ authenticated: false });
    }
});

// Serve main HTML file for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;