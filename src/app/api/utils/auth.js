/**
 * TRADIE Platform - Authentication Utilities
 * Version: 1.0
 * Date: October 22, 2025
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Hash password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify password against hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} True if password matches
 */
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

/**
 * Generate JWT access token (short-lived)
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
function generateAccessToken(user) {
  const payload = {
    user_id: user.user_id,
    email: user.email,
    role: user.role,
    status: user.status,
    type: 'access'
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    issuer: 'TRADIE',
    audience: 'TRADIE-API'
  });
}

/**
 * Generate refresh token (long-lived)
 * @param {Object} user - User object
 * @returns {string} Refresh token
 */
function generateRefreshToken(user) {
  const payload = {
    user_id: user.user_id,
    type: 'refresh'
  };
  
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    issuer: 'TRADIE',
    audience: 'TRADIE-API'
  });
}

/**
 * Verify JWT access token
 * @param {string} token - JWT token
 * @returns {Object} Decoded payload
 * @throws {Error} If token is invalid or expired
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'TRADIE',
      audience: 'TRADIE-API'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      throw new Error('Token verification failed');
    }
  }
}

/**
 * Verify refresh token
 * @param {string} token - Refresh token
 * @returns {Object} Decoded payload
 * @throws {Error} If token is invalid or expired
 */
function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, {
      issuer: 'TRADIE',
      audience: 'TRADIE-API'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Refresh token expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid refresh token');
    } else {
      throw new Error('Refresh token verification failed');
    }
  }
}

/**
 * Generate random 6-digit OTP
 * @returns {string} 6-digit OTP
 */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Generate secure random token for password reset
 * @returns {string} Random token
 */
function generateResetToken() {
  return require('crypto').randomBytes(32).toString('hex');
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number
 * @returns {boolean} True if valid
 */
function isValidPhone(phone) {
  const phoneRegex = /^\+?91?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

/**
 * Validate password strength
 * @param {string} password - Password
 * @returns {Object} {valid: boolean, errors: string[]}
 */
function validatePasswordStrength(password) {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Sanitize user data for response (remove sensitive fields)
 * @param {Object} user - User object
 * @returns {Object} Sanitized user object
 */
function sanitizeUser(user) {
  const { password_hash, ...sanitized } = user;
  return sanitized;
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  generateOTP,
  generateResetToken,
  isValidEmail,
  isValidPhone,
  validatePasswordStrength,
  sanitizeUser
};
