const jwt = require("jsonwebtoken");


exports.generateToken = (email) => {
    const payload = {
        email: email
    }
    const token = jwt.sign(payload, process.env.tokenSecret, { expiresIn: "30d" })
    return token;
}