const Application = require('../models/Application');

exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const existing = await Application.findOne({ job: jobId, applicant: req.user.id });
    if (existing) return res.status(400).json({ message: 'You have already applied for this job' });

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id
    });
    res.status(201).json({ message: 'Successfully applied for the job', application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};