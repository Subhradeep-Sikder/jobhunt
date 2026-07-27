const router = require('express').Router();
const { applyForJob } = require('../controllers/applicationController');
const { verifyToken } = require('../middleware/auth');

router.post('/apply', verifyToken, applyForJob);

module.exports = router;