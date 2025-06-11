const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./route/auth.route.js');
const participantRoutes = require('./route/participant.route.js');
const corsMiddleware = require('./middleware/cors.middleware.js');
const cookieParser = require('cookie-parser');

const db = require('./models'); // Import model & sequelize instance

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/participant', participantRoutes);

// Test DB connection and sync (opsional)
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');

    // Kalau mau sync schema (optional)
    // return db.sequelize.sync();

  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on PORT: ' + PORT);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
