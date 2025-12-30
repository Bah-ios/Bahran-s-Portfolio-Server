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
  
  },
  tags:{type: [String]},
  link:{ type: String }

},
{
    timestamps: true,     // Automatically adds createdAt & updatedAt fields
  }  
);
// Export the model so it can be used in routes
module.exports = mongoose.model("Project", ProjectSchema);
