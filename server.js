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

// Routes
app.get('/api/intern/:id', async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ message: "Intern not found" });
    res.json(intern);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leaderboard (Top 10 by totalRaised)
app.get('/api/leaderboard', async (req, res) => {
  try {
    const topInterns = await Intern.find().sort({ totalRaised: -1 }).limit(10);
    res.json(topInterns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seed a dummy intern (optional POST route)
app.post('/api/intern', async (req, res) => {
  try {
    const newIntern = new Intern(req.body);
    const saved = await newIntern.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Auth Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

