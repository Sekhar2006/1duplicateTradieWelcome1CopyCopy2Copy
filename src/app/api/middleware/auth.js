/**
 * TRADIE Platform - Authentication Middleware
 * Version: 1.0
 * Date: October 22, 2025
 */

const { verifyToken } = require('../utils/auth');

/**
 * Authenticate user from JWT token in Authorization header
 * 
 * Usage:
 * router.get('/protected', authenticateUser, (req, res) => {
 *   // req.user contains decoded token payload
 * });
 */
function authenticateUser(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'No authorization header',
        message: 'Please provide an access token in the Authorization header'
      });
    }
    
    // Extract token from "Bearer TOKEN" format
    const parts = authHeader.split(' ');
    
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        error: 'Invalid authorization format',
        message: 'Authorization header must be in format: Bearer TOKEN'
      });
    }
    
    const token = parts[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required',
        message: 'Please provide a valid access token'
      });
    }
    
    // Verify and decode token
    const decoded = verifyToken(token);
    
    // Check token type
    if (decoded.type !== 'access') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token type',
        message: 'Please use an access token, not a refresh token'
      });
    }
    
    // Attach decoded user info to request object
    req.user = decoded;
    
    next();
    
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.message === 'Token expired') {
      return res.status(401).json({
        success: false,
        error: 'Token expired',
        message: 'Your session has expired. Please refresh your token or login again.'
      });
    }
    
    return res.status(403).json({
      success: false,
      error: 'Authentication failed',
      message: error.message
    });
  }
}

/**
 * Authorize specific roles
 * 
 * Usage:
 * router.post('/admin-only', authenticateUser, authorizeRoles('admin'), (req, res) => {
 *   // Only admin users can access this
 * });
 * 
 * router.get('/producer-or-provider', authenticateUser, authorizeRoles('producer', 'provider'), (req, res) => {
 *   // Producers OR providers can access this
 * });
 * 
 * @param {...string} allowedRoles - List of allowed roles
 */
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        message: 'You must be logged in to access this resource'
      });
    }
    
    // Check if user's role is in allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
        message: `This action requires one of the following roles: ${allowedRoles.join(', ')}`,
        requiredRoles: allowedRoles,
        yourRole: req.user.role
      });
    }
    
    next();
  };
}

/**
 * Authorize resource owner or admin
 * Allows user to access only their own resources, or admins to access any
 * 
 * Usage:
 * router.get('/providers/:provider_id', authenticateUser, authorizeOwner('provider_id'), (req, res) => {
 *   // User can only access their own provider data (or admin can access any)
 * });
 * 
 * @param {string} resourceUserIdParam - Parameter name containing user_id (default: 'user_id')
 * @param {string} location - Where to find the user_id: 'params' or 'body' (default: 'params')
 */
function authorizeOwner(resourceUserIdParam = 'user_id', location = 'params') {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    // Admin can access any resource
    if (req.user.role === 'admin') {
      return next();
    }
    
    // Get resource user ID from params or body
    const resourceUserId = location === 'body' 
      ? req.body[resourceUserIdParam]
      : req.params[resourceUserIdParam];
    
    // Convert to number for comparison
    const resourceUserIdNum = parseInt(resourceUserId);
    const currentUserIdNum = parseInt(req.user.user_id);
    
    // Check if user owns this resource
    if (currentUserIdNum !== resourceUserIdNum) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
        message: 'You can only access your own resources'
      });
    }
    
    next();
  };
}

/**
 * Check if user account is active
 * 
 * Usage:
 * router.get('/resource', authenticateUser, requireActive, (req, res) => {
 *   // Only active users can access
 * });
 */
function requireActive(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }
  
  if (req.user.status !== 'active') {
    return res.status(403).json({
      success: false,
      error: 'Account not active',
      message: `Your account status is: ${req.user.status}`,
      status: req.user.status
    });
  }
  
  next();
}

/**
 * Optional authentication - continues even if no token provided
 * Useful for endpoints that have different behavior for logged-in users
 * 
 * Usage:
 * router.get('/public-with-benefits', optionalAuth, (req, res) => {
 *   if (req.user) {
 *     // User is logged in, show personalized content
 *   } else {
 *     // User is not logged in, show generic content
 *   }
 * });
 */
function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      req.user = null;
      return next();
    }
    
    const parts = authHeader.split(' ');
    
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      req.user = null;
      return next();
    }
    
    const token = parts[1];
    
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
    } catch (error) {
      req.user = null;
    }
    
    next();
    
  } catch (error) {
    req.user = null;
    next();
  }
}

/**
 * Rate limiting for authentication endpoints
 * Prevents brute force attacks
 * 
 * Usage:
 * router.post('/login', authRateLimit, (req, res) => {
 *   // Limited to 5 requests per 15 minutes per IP
 * });
 */
const rateLimit = require('express-rate-limit');

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Too many login attempts',
    message: 'Please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * API rate limiting for general endpoints
 */
const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests',
    message: 'Please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  authenticateUser,
  authorizeRoles,
  authorizeOwner,
  requireActive,
  optionalAuth,
  authRateLimit,
  apiRateLimit
};
