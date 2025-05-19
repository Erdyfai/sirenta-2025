const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./route/auth.route.js');
const corsMiddleware = require('./middleware/cors.middleware.js');

const db = require('./models'); // Import model & sequelize instance

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Test DB connection and sync (opsional)
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');

    // Kalau mau sync schema (optional)
    // return db.sequelize.sync();

  })
  .then(() => {
    // Baru start server kalau DB sudah siap
    app.listen(PORT, () => {
      console.log('Server is running on PORT: ' + PORT);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
