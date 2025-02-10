const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const router  = require('./Router/Routes.js');

const app = express();
const PORT = process.env.PORT || 5001;

//? Database setup
async function Database_Connection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ Connected to Mongodb Database`);
    }
    catch (error) {
        console.log(error)
    }
}
Database_Connection();


//? Middleware setup
app.use(cors());
app.use(express.json());

//? Routes setup
app.use(router);

app.listen(PORT, () => console.log(`🚀 Server running on port: http://localhost:${PORT}`));
