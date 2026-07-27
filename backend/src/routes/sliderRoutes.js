const router = require('express').Router();
const { createSlider, getSliders, deleteSlider } = require('../controllers/sliderController');
const { verifyToken, isEmployer } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getSliders);
router.post('/', verifyToken, isEmployer, upload.single('image'), createSlider);
router.delete('/:id', verifyToken, isEmployer, deleteSlider);

module.exports = router;