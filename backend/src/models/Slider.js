const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary URL
  status: { type: Boolean, default: true } // Active/Inactive toggle
}, { timestamps: true });

module.exports = mongoose.model('Slider', sliderSchema);