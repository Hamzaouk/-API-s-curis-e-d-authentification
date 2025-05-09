/**
 * Custom error handler middleware
 * Formats and returns error responses
 */
const errorHandler = (err, req, res, next) => {
    // Log error for development
    console.error(err);
    
    // Default error status and message
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Erreur du serveur';
    
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      statusCode = 400;
      const errors = Object.values(err.errors).map(val => ({ msg: val.message }));
      return res.status(statusCode).json({
        success: false,
        errors
      });
    }
    
    // Handle Mongoose duplicate key errors
    if (err.code === 11000) {
      statusCode = 400;
      message = 'Cet email est déjà utilisé';
      return res.status(statusCode).json({
        success: false,
        errors: [{ msg: message }]
      });
    }
    
    // Handle Mongoose bad ObjectId
    if (err.name === 'CastError') {
      statusCode = 404;
      message = 'Ressource non trouvée';
      return res.status(statusCode).json({
        success: false,
        errors: [{ msg: message }]
      });
    }
    
    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
      statusCode = 401;
      message = 'Token invalide';
      return res.status(statusCode).json({
        success: false,
        errors: [{ msg: message }]
      });
    }
    
    // Handle JWT expiration
    if (err.name === 'TokenExpiredError') {
      statusCode = 401;
      message = 'Token expiré, veuillez vous reconnecter';
      return res.status(statusCode).json({
        success: false,
        errors: [{ msg: message }]
      });
    }
    
    // Return standardized error response
    res.status(statusCode).json({
      success: false,
      errors: [{ msg: message }]
    });
  };
  
  module.exports = errorHandler;