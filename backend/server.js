const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Import swaggerSpec from your swagger.js file

// Load environment variables from a .env file
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use userRoutes
app.use('/api', userRoutes);

// Use patientRoutes
app.use('/api', patientRoutes);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB: ', error);
  });

// Passport middleware for user authentication
app.use(passport.initialize());
require('./config/passport')(passport);

// Define routes here...

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
