const asyncHandler = require('express-async-handler')
const UserModel = require('../models/User')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('Received registration request for username:', username);

        // Check if the user already exists
        const userExists = await UserModel.findOne({ username });

        if (userExists) {
            console.log('User already exists:', username);
            res.status(400).json({ message: 'Username already exists!' });
            return;
        }

        console.log('Creating a new user with username:', username);

        // Create a new user
        const user = new UserModel({
            username,
            password,
        });

        // Save the user to the database
        const savedUser = await user.save();

        if (savedUser) {
            console.log('User registered successfully:', savedUser.username);
            res.status(201).json({
                _id: savedUser._id,
                username: savedUser.username,
                token: generateToken(savedUser._id),
            });
        } else {
            console.error('Error occurred during registration');
            res.status(500).json({ message: 'Error occurred during registration' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error occurred during registration' });
    }
});


const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    console.log('User:', user);

    if (!user) {
        console.log('User not found');
        res.status(400).json({ message: 'Invalid Email or Password!' });
        return;
    }

    const isPasswordValid = await user.matchPassword(password);
    console.log('Is Password Valid:', isPasswordValid);

    if (!isPasswordValid) {
        console.log('Password is not valid');
        res.status(400).json({ message: 'Invalid Email or Password!' });
        return;
    }

    // If user and password match, generate and send a token.
    res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
    });
});

module.exports = {registerUser, authUser}