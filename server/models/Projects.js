const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image:{
    type: String, 
    required: true
  },
  tags:{
    type: [String], 
    required: true
  },
  link:{ 
    type: String,
    required: true
   },

   gitLink:{
    type: String,
    required: true
  }

},
{
    timestamps: true,     // Automatically adds createdAt & updatedAt fields
  }  
);
// Export the model so it can be used in routes
module.exports = mongoose.model("Project", ProjectSchema);
