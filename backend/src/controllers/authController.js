const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) return res.status(400).json({ message: 'An account with this email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === 'employer' ? 'employer' : 'job_seeker';
    
    const user = await User.create({
      fullName,
      email: cleanEmail,
      password: hashedPassword,
      role: userRole
    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.status(201).json({
      message: 'Account created successfully',
      token,
      role: user.role,
      fullName: user.fullName,
      userId: user._id
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: user.role, fullName: user.fullName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};