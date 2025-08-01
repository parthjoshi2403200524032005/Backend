// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");


// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors({ origin: "*" }));



// // Test API
// app.get("/", (req, res) => res.send("Hello, world!"));



// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Intern = require('./models/User'); // no need for `.js`
const authRoutes = require('./Routes/auth'); // no need for `.js`

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));


  app.get("/", (req, res) => res.send("Hello, world!"));

// Auth Routes
app.use('/api/auth', authRoutes);

// Test API

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

