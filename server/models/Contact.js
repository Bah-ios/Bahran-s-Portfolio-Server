const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // If true, frontend MUST send a name
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now, // Auto-sets the time
  },
});

module.exports = mongoose.model('Contact', ContactSchema);