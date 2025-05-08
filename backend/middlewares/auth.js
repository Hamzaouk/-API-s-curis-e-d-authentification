const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * JWT Authentication Middleware
 * Protects routes by verifying JWT token
 */
exports.jwtAuth = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({
      success: false,
      errors: [{ msg: 'Pas de token, autorisation refusée' }]
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      errors: [{ msg: 'Token invalide' }]
    });
  }
};

/**
 * Session Authentication Middleware
 * Protects routes by verifying active user session
 */
exports.sessionAuth = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        success: false,
        errors: [{ msg: 'Non authentifié, session invalide' }]
      });
    }

    const user = await User.findById(req.session.userId).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        errors: [{ msg: 'Utilisateur non trouvé' }]
      });
    }

    req.user = { id: user._id };
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Erreur du serveur' }]
    });
  }
};

/**
 * Basic Authentication Middleware
 * Authenticates users via Basic Auth header
 */
exports.basicAuth = async (req, res, next) => {
  try {
    // Check for authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({
        success: false,
        errors: [{ msg: 'Authentication requise' }]
      });
    }

    // Decode Base64 credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [email, password] = credentials.split(':');

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false, 
        errors: [{ msg: 'Identifiants invalides' }]
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        errors: [{ msg: 'Identifiants invalides' }]
      });
    }

    // Attach user to request
    req.user = { id: user._id };
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Erreur du serveur' }]
    });
  }
};

/**
 * Role-based authorization middleware
 * Verifies if user has required role
 * @param {String} role - Required role to access route
 */
exports.authorize = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          errors: [{ msg: 'Utilisateur non trouvé' }]
        });
      }

      if (user.role !== role) {
        return res.status(403).json({
          success: false,
          errors: [{ msg: 'Accès refusé: privilèges insuffisants' }]
        });
      }

      next();
    } catch (err) {
      res.status(500).json({
        success: false,
        errors: [{ msg: 'Erreur du serveur' }]
      });
    }
  };
};