const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const alumniSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true,
        match: /.+\@.+\..+/, // Email format validation
    },
    password: {
        type: String,
        required: true,
         // Minimum length for password
    },
    name: {
        type: String,
        required: true,
    },
    tenthPercentage: {
        type: String,
        required: true,
    },
    twelfthPercentage: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    admissionYear: {
        type: Date,
        required: true,
    },
    passingYear: {
        type: Date,
        required: true,
    },
    currentCompany: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    }
});

const Alumni = model("Alumni", alumniSchema);

module.exports = Alumni;
