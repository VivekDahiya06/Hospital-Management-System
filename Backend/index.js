const express = require('express');
const cors = require('cors');
const router  = require('./Router/Routes.js');

const app = express();
const PORT = 5000;

// Middleware setup
app.use(cors());
app.use(express.json()); // Optional: Parses JSON request bodies

// Routes setup
app.use(router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
