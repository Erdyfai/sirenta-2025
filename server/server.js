const app = require('./app');
const db = require('./models'); // Import model & sequelize instance

const PORT = process.env.PORT || 8080;

db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');

    // return db.sequelize.sync(); // optional sync
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on PORT: ' + PORT);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
