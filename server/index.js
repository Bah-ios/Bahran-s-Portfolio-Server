// 1. Import the libraries
const express = require('express');
const mongoose = require('mongoose'); // <--- Import Mongoose
const cors = require('cors');
const dotenv = require('dotenv');
// Import the Model
const Contact = require('./models/Contact');
const Project = require('./models/Projects');
const Projects = require('./models/Projects');
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


// GET Route: Fetch all projects
app.get('/api/projects', async (req, res) => {
  try {
    // .find() with empty brackets means "Find Everything"
    const projects = await Project.find(); 
    res.json(projects); // Send the list back to the browser
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

app.post('/api/projects', async (req,res) =>{
  try{
    const { title, description, tags, link} = req.body
    if(!title || !description){
      return res.status(400).json({success: false, message: "Title and Description are Requiered"})
    }
    const newProject = new Projects({
      title,
      description,
      tags: tags ? tags.split(',') : [],
      link

    });


    await newProject.save();
    res.status(201).json({success: true , message: "Project added"})

  }
  catch(error){
    console.log(error)
    res.status(500).json({success: false , message : "server Error"})
  }
});

// CREATE THE ENDPOINT
app.post('/api/contact', async (req, res) => {
  try {
    // 1. Destructure data from the request body
    const { name, email, message } = req.body;

    // 2. Simple Validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // 3. Create a new Contact in memory
    const newContact = new Contact({
      name,
      email,
      message
    });

    // 4. Save to Database (Await because it takes time)
    await newContact.save();

    // 5. Send success response back to frontend
    res.status(201).json({ success: true, message: "Message Sent Successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});