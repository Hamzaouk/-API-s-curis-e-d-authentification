// config/db.js

const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected ✅");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDb;
