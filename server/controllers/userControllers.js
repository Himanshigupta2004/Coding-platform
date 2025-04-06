const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        console.log(username);

        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        user = new User({ username, email, password });
        await user.save();

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ token, user: { id: user._id, username, email } });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
      
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id: user._id, username: user.username, email } });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerUser, loginUser, getCurrentUser };
