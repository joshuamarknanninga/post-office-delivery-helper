const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch(err) {
        res.status(400).json({ error: 'Error registering user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch(err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
