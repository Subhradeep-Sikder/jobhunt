const router = require('express').Router();
const { createMedia, getMedia, deleteMedia } = require('../controllers/mediaController');
const { verifyToken, isEmployer } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getMedia);
router.post('/', verifyToken, isEmployer, upload.single('image'), createMedia);
router.delete('/:id', verifyToken, isEmployer, deleteMedia);

module.exports = router;