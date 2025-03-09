const express = require('express');
require('dotenv').config();
const cors = require('cors');
const router = require('./Router/Routes.js');
const Database_Connection = require('./Database/DB.js');

const app = express();
const PORT = process.env.PORT || 5001;

// Debugging
console.log("🔗 Connecting to MongoDB...");

// Middleware setup
app.use(cors());
app.use(express.json());

// Start server only after database connection
(async () => {
    try {
        await Database_Connection();
        // Routes setup
        app.use("/api", router); // Mount routes under /api

        // Server setup
        app.listen(PORT, () => console.log(`🚀 Server running on: http://localhost:${PORT}`));
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
        process.exit(1); // Exit process if DB connection fails
    }
})();
