const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  designation: { type: String, required: true },
  salary: { type: String, required: true },
  jobType: { type: String, required: true }, // e.g., Full-Time
  category: { type: String, required: true },
  deadline: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String }, // Cloudinary URL
  skills: [{ type: String }],
  description: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);