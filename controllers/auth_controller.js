const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');

exports.register = async (req, res) => {
    console.log('Trying to register');
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

exports.googleRegister = async (req, res) => {
    console.log('Trying to google register');
    try {
        // Validate user credentials (name, email)
        const { name, email, googleId } = req.body;
        if (!name || !email || !googleId) {
            return res.status(400).json({ message: 'Name and email and googleId are required' });
        }
        // Check if email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Create new user object
        const newUser = new User({
            name,
            email,
            googleId,
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
}

exports.login = async (req, res) => {
    console.log('Trying to login');
    try {
        // Validate user credentials (email, password)
        const { email, password } = req.body;
        if (!email || !password) {
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

exports.googleLogin = async (req, res) => {
    console.log('Trying google login ');
    try {
        const { accessToken } = req.body;
        if (!accessToken) {
            return res.status(400).json({ message: 'Access token is required' });
        }

        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);

        const email = response?.data?.email;

        if (!email) {
            return res.status(401).json({ message: 'Invalid access token' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status('400').json({ message: 'User not found!' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Respond with token and user data
        return res.status(200).json({ token, user });
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
}