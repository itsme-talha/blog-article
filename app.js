require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
// const MongoStore = require('connect-mongo'); <-- Ise bilkul nikal dein ya comment rakhein
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const path = require('path');

// Import Database Connection & Middleware
const connectDB = require('./config/db');
const logger = require('./middleware/logger');

const app = express();

// Connect to MongoDB
connectDB();

// Setup EJS and Express Layouts
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Static Files (CSS, JS, Uploaded Images)
app.use(express.static('public'));

// Body Parser for Form Data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Method Override for PUT/DELETE requests from forms
app.use(methodOverride('_method'));

// Express Session (Using built-in MemoryStore)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 Day
}));

// Express File Upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
}));

// Global Middleware
app.use(logger);

// Pass session variables to all views globally
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

// Mount Routes
app.use('/auth', authRoutes);
app.use('/', postRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('<h1>500 - Server Error</h1>');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});