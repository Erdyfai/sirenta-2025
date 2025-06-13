const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./route/auth.route.js');
const participantRoutes = require('./route/participant.route.js');
const faqRoutes = require('./route/faq.route.js');
const corsMiddleware = require('./middleware/cors.middleware.js');
const cookieParser = require('cookie-parser');
const juryRoutes = require('./route/jury.route.js');

dotenv.config();
const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/participant', participantRoutes);
app.use('/api/jury', juryRoutes);
app.use('/api/faq', faqRoutes);

module.exports = app;
