const Media = require('../models/Media');

exports.createMedia = async (req, res) => {
  try {
    const { type, name, category } = req.body;
    let url = '';

    if (type === 'image' && req.file) {
      url = req.file.path;
    } else if (type === 'video') {
      url = req.body.videoLink; // Direct video link or Cloudinary file
    }

    const media = await Media.create({ type, name, url, category });
    res.status(201).json({ message: 'Media uploaded successfully', media });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMedia = async (req, res) => {
  try {
    const mediaList = await Media.find();
    res.json(mediaList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: 'Media deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};