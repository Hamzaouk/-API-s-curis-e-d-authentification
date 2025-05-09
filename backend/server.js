const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require('connect-mongo');
const connectDb = require("./config/db");
const corsOptions = require("./config/cors");
const errorHandler = require('./middleware/error');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions()));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions'
    }),
    cookie: { 
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

// Base route
app.get("/", (req, res) => {
  res.json({ message: "API Running Successfully!" });
});

// Route definitions
app.use('/api/auth', require('./routes/auth'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    errors: [{ msg: 'Route non trouvée' }]
  });
});

// Error handling middleware
app.use(errorHandler);

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});