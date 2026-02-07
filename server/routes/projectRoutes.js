const express = require('express');
const router = express.Router();
const Projects = require('../models/Projects');


router.post('/', async (req,res) =>{
  try{
    const { image,title, description, tags, link, gitLink} = req.body
    if(!title || !description){
      return res.status(400).json({success: false, message: "Title and Description are Requiered"})
    }
    const newProject = new Projects({
      image,
      title,
      description,
      tags: tags ? tags.split(',') : [],
      link,
      gitLink

    });


    await newProject.save();
    res.status(201).json({success: true , message: "Project added"})

  }
  catch(error){
    console.log(error)
    res.status(500).json({success: false , message : "server Error"})
  }
});

// GET Route: Fetch all projects
router.get('/', async (req, res) => {
  try {
    // .find() with empty brackets means "Find Everything"
    const projects = await Projects.find(); 
    res.json(projects); // Send the list back to the browser
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

module.exports = router;