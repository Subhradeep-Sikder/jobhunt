const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : '';
    const jobData = {
      ...req.body,
      skills: req.body.skills ? (typeof req.body.skills === 'string' ? req.body.skills.split(',').map(s => s.trim()) : req.body.skills) : [],
      image: imageUrl,
      createdBy: req.user.id
    };
    const job = await Job.create(jobData);
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const jobs = await Job.find(filter).populate('createdBy', 'fullName email').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('createdBy', 'fullName email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    
    job.isActive = !job.isActive;
    await job.save();
    res.json({ message: 'Job status updated', job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};