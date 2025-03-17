const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// --- Routes ---
const sectionRoutes = require('./routes/section_routes');
const problemRoutes = require('./routes/problem_routes');
const authRoutes = require('./routes/auth_routes');

const mongoConnect = require('./database');

// Middleware to check authentication before accessing routes with '/api/sections' and '/api/problems'
const checkAuthentication = require('./middlewares/auth_middleware');

// Use Section Routes
app.use('/api/sections', checkAuthentication, sectionRoutes);

// Use Problem Routes
app.use('/api/problems', checkAuthentication, problemRoutes);

// Use Auth Routes
app.use('/api/auth', authRoutes);

// Start server
mongoConnect().then((result) => {
  console.log("Database Connected Successfully");
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
