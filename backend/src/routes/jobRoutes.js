const router = require('express').Router();
const { createJob, getAllJobs, getJobById, updateJobStatus, deleteJob } = require('../controllers/jobController');
const { verifyToken, isEmployer } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', verifyToken, isEmployer, upload.single('image'), createJob);
router.patch('/:id/status', verifyToken, isEmployer, updateJobStatus);
router.delete('/:id', verifyToken, isEmployer, deleteJob);

module.exports = router;