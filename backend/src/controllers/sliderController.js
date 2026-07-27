const Slider = require('../models/Slider');

exports.createSlider = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : '';
    const slider = await Slider.create({
      name: req.body.name,
      image: imageUrl,
      status: req.body.status !== undefined ? req.body.status : true
    });
    res.status(201).json({ message: 'Slider created successfully', slider });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSlider = async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slider deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};