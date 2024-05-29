const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Alumni = require('../models/user.js');
const { JWT_KEY } = require('../config/env.js');
const isValidated = require('../middlewares/isValidate.js');

const router = express.Router();

// Error object to be sent for invalid credentials
const invalidCredentialsError = {
    status: 404,
    message: "Invalid email or password"
};

router.use(express.json());

router.post('/login', async (req, res) => {
    try {
        // Extract the email and password
        const { email, password } = req.body;

        // Fetch user from DB and check if user exists
        const user = await Alumni.findOne({ email });
        if (!user) {
            return res.status(404).json(invalidCredentialsError);
        }

        // Compare the password in the request body with the password in DB
        const passwordMatches = await bcrypt.compare(password, user.password);

        // Send the response if password is incorrect
        if (!passwordMatches) {
            return res.status(404).json(invalidCredentialsError);
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, JWT_KEY, { expiresIn: '1h' });

        // Send the response
        return res.status(200).json({
            status: 200,
            message: "Logged in successfully",
            token: token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
});

router.get('/verify-token', isValidated, (req, res) => {
    res.status(200).send({
        status: 200,
        message: "You have accessed a protected route",
        user: req.user
    });
});
router.get('/all',  async (req, res) => {
    try {
        const alumni = await Alumni.find({});
        res.status(200).json(alumni);
    } catch (error) {
        console.error('Error fetching alumni:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
