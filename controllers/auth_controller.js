const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res, next) => {
    try {
        // Validate user credentials (name, email, password)
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Check if email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 12);

        // Create new user object
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { email: newUser.email, _id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Respond with token and user data
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res, next) => {
    try {
        // Validate user credentials (email, password)
        const { email, password } = req.body;
        if (!email ||!password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Check if password matches
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        // Respond with token and user data
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}