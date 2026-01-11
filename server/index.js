// 1. Import the libraries
const express = require('express');
const mongoose = require('mongoose'); // <--- Import Mongoose
const cors = require('cors');
const dotenv = require('dotenv');
// Import the Model

const Project = require('./models/Projects');
const Contact = require('./models/Contact');
const { triggerAsyncId } = require('node:async_hooks');
// 2. Load environment variables (your secrets)
dotenv.config();

// 3. Create the App
const app = express();

// 4. Middleware (The Gatekeepers)
// Allow the frontend to talk to us
app.use(cors()); 
// If data comes in as JSON, understand it (otherwise it looks like gibberish)
app.use(express.json()); 

// 5. A Test Route
// If someone goes to http://localhost:5000/, say hello.
app.get('/', (req, res) => {
  res.send('Backend is running!');

});
// --- DATABASE CONNECTION ---
// We use the variable from the .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));
// 6. Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use('/api/contact', require("./routes/contactRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
