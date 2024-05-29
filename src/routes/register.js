const express = require('express');
const bcrypt = require('bcrypt');
const Alumni = require('../models/user');

const router = express.Router();
router.use(express.json());

router.post('/register', async (req, res) => {
    try {
        const { email, password, name, tenthPercentage, twelfthPercentage, dob, branch, admissionYear, passingYear, currentCompany, designation } = req.body;

        // Check if the email already exists
        const existingUser = await Alumni.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new Alumni({
            email,
            password: hashedPassword,
            name,
            tenthPercentage,
            twelfthPercentage,
            dob,
            branch,
            admissionYear,
            passingYear,
            currentCompany,
            designation
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
