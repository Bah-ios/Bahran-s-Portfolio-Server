const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// CREATE THE ENDPOINT
router.post('/', async (req, res) => {
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
}
);
router.get('/', async (req, res) => {
  try {
    // .find() with empty brackets means "Find Everything"
    const newContact = await Contact.find(); 
    res.json(newContact); // Send the list back to the browser
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});
module.exports = router;