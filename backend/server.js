// server.js

const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const cors = require("cors");
const connectDb = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" }
  })
);

// Base route
app.get("/", (req, res) => {
  res.json({ message: "API Running Successfully!" });
});

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});