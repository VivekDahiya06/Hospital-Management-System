const mongoose = require('mongoose');
require('dotenv').config();

// Debugging: Check if environment variables are loaded
console.log("🔎 Debug: USERNAME_1:", process.env.USERNAME_1);
console.log("🔎 Debug: PASSWORD_1:", process.env.PASSWORD_1 ? "******" : "Not found"); // Hide password for security

// Ensure environment variables exist
if (!process.env.USERNAME_1 || !process.env.PASSWORD_1) {
    console.error("❌ Missing MongoDB credentials in .env file");
    process.exit(1);
}

const URI = `mongodb+srv://${process.env.USERNAME_1}:${process.env.PASSWORD_1}@cluster0.gn77i.mongodb.net/Hospital_Management_System?retryWrites=true&w=majority&appName=Cluster0`;

// Database connection function
async function Database_Connection() {
    try {
        // Attach event listeners before connecting
        mongoose.connection.on("connected", () => {
            console.log(`✅ Connected to MongoDB Database at => ${new Date().toLocaleTimeString()}`);
        });

        mongoose.connection.on("error", (err) => {
            console.error(`❌ MongoDB connection error:`, err);
        });

        mongoose.connection.on("disconnected", () => {
            console.log(`⚠️ MongoDB disconnected! at: ${new Date().toLocaleTimeString()}`);
        });

        // Connect to MongoDB
        await mongoose.connect(URI);
    } catch (error) {
        console.error("❌ Database connection error:", error);
        process.exit(1);
    }
}

module.exports = Database_Connection;
