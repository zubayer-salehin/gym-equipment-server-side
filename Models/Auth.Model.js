const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "Provide a First Name"],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Provide a Last Name"],
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
    },
    password: {
        type: String,
        minLength: [6, "Password must be at least 6 characters."],
        required: [true, "Password is required"],
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

/*

{
  "name": "Zubayer Salehin",
  "email": "zubayersalehin@gmail.com",
  "password": "zubayer12345#6",
}

*/