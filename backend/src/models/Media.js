const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  type: { type: String, enum: ['image', 'video'], required: true },
  name: { type: String, required: true },
  url: { type: String, required: true }, // Cloudinary URL or Video link
  category: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);