// Create a file named 'auth.js' in the '/middlewares' folder
// /middlewares/auth.js

const User = require('../models/User'); // Import your User model

// Middleware to check if the user is a doctor
const isDoctor = async (req, res, next) => {
  try {
    // Check if the user is authenticated (you may need to implement your authentication logic)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check the user's role to determine if they are a doctor
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (user.role !== 'doctor') {
      return res.status(403).json({ message: 'Access denied. Only doctors are allowed.' });
    }

    // If the user is a doctor, allow them to access the route
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { isDoctor };
