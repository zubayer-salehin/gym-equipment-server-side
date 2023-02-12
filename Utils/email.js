const nodemailer = require("nodemailer");


module.exports.sendEmailWithGmail = (userEmail, id) => {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.AUTH_USER,
            pass: process.env.AUTH_PASS
        }
    })

    let mailOptions = {
        from: "freelancerzubear@gmail.com",
        to: userEmail,
        subject: "Website Password Reset",
        html: `<h3>Reset Password<h3/>
        <p>You can change your password for security reasons or reset it if you forget it. Password Reset Link is Here: http://localhost:3000/reset_password/${id}<p/>`
    }

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Email was occoured");
        } else {
            console.log("Email Sent");
        }
    })
}