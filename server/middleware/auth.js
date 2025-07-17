const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes that require authentication
 * Verifies the JWT token and adds the user to the request object
 */
exports.protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract token from Bearer token
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    // Or check if token exists in cookies
    token = req.cookies.token;
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Not authorized to access this route',
        code: 'UNAUTHORIZED'
      }
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user to request object
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        }
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Not authorized to access this route',
        code: 'INVALID_TOKEN'
      }
    });
  }
};

/**
 * Middleware to restrict access to specific roles
 * @param {...String} roles - Roles allowed to access the route
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'User role not defined',
          code: 'ROLE_UNDEFINED'
        }
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          message: `User role ${req.user.role} is not authorized to access this route`,
          code: 'FORBIDDEN'
        }
      });
    }
    
    next();
  };
};