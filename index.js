const express = require('express');
const mongoose = require('mongoose'); // Replace with libsql import if needed
const { check, validationResult } = require('express-validator');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// --- Routes ---
const sectionRoutes = require('./routes/section_routes');
const problemRoutes = require('./routes/problem_routes');
const mongoConnect = require('./database');

// Use Section Routes
app.use('/api/sections', sectionRoutes);

// Use Problem Routes
app.use('/api/problems', problemRoutes);

// Start server
mongoConnect().then((result) => {
  console.log("Database Connected Successfully");
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
