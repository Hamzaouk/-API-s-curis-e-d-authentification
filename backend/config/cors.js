/**
 * CORS Configuration
 * Customized based on environment
 */
const corsOptions = () => {
    // Development environment
    if (process.env.NODE_ENV === 'development') {
      return {
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
        credentials: true,
        optionsSuccessStatus: 200
      };
    }
    
    // Production environment
    return {
      origin: process.env.ALLOWED_ORIGINS 
        ? process.env.ALLOWED_ORIGINS.split(',') 
        : ['https://yourdomain.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
      credentials: true,
      optionsSuccessStatus: 200
    };
  };
  
  module.exports = corsOptions;