const User = require("../models/user");
const nodemailer = require("nodemailer");
require('dotenv').config();

async function handleUserSignup2(req, res, next) {
    let { phone_number, email } = req.body;
    email = email.toLowerCase();
    console.log("email=");
    console.log(email);
    console.log("phone_number");
    console.log(phone_number);
    try {
        const check_email = await User.findOne({ email });
        const check_phonenumber = await User.findOne({ phone_number });

        if (!check_phonenumber && !check_email) {
            next(); // Call next to pass control to the next middleware
        } else if (check_phonenumber && !check_email) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                error: {
                    code: "Phone number already registered",
                    message: "Please try again with another phone number."
                }
            });
        } else if (!check_phonenumber && check_email) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                error: {
                    code: "Email already registered",
                    message: "Please try again with another email."
                }
            });
        } else {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                error: {
                    code: "Email and Phone number already registered",
                    message: "Please try again with another email and phone number."
                }
            });
        }
    } catch (error) {
        console.error("Error in handleUserSignup2:", error);
        return res.status(500).json({
            status: "error",
            statusCode: 500,
            error: {
                code: "SOMETHING_WENT_WRONG",
                message: "An error occurred. Please try again."
            }
        });
    }
}
let otpStore = null; 

module.exports = {
    
    mailT: async function(req, res) {
        try {
            // Generate a random 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000);
      
            // Create a Nodemailer transporter
            console.log("CONTROLLER transponder=")
            console.log(JSON.stringify(process.env.EMAIL),JSON.stringify(process.env.EMAIL_PASSWORD))
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                },
            });
      
            // Retrieve email from the form data
            const { email } = req.body;
      
            // HTML content of the email with the OTP
            const emailHTML = `
                <p>Hello,</p>
                <p>Your One-Time Password (OTP) for signup is: <strong>${otp}</strong></p>
                <p>Please use this OTP to complete your signup process.</p>
                <p>Best regards,<br>Lavkesh Jaiswal</p>
            `;
      
            // Send mail
            let info = await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "OTP for Verification at BudgetBuddy",
                html: emailHTML,
            });
      
            console.log("Message sent: %s", info.messageId);
            otpStore = otp;
            console.log("session otp:",otp)
            const successMessage = `
                <html>
                <head>
                    <title>Email Sent</title>
                </head>
                <body>
                    <h1>Email Sent Successfully</h1>
                    <p>An email containing the OTP has been sent to ${email}.</p>
                </body>
                </html>
            `;
            // return res.render("forget2.ejs",{email: email }) // Render the verify.ejs page with the email
            // return res.render("forget2.ejs",{email: email }) // Render the verify.ejs page with the email
            return res.status(200).json({ success: successMessage }); // Render the verify.ejs page with the email
        } catch (error) {
            console.error("Error sending mail:", error);
            res.status(500).send("Error sending mail");
        }
    },
    verify: function(req, res) {
        const { email, otp } = req.body;
        // Here you can verify the OTP
        console.log("sesssssion_otp:",otpStore)
        console.log("email:",email)
        console.log("otp:",otp);
      
        if (otp == otpStore) {
            // If OTP is correct, redirect to home page
            console.log("verified");
            return res.status(200).json({ success: "OTP verified successfully" });
        //    res.redirect("/login");
        } else {
            // If OTP is incorrect, render the verify page again with an error message
            console.log("not verified");
            return res.status(400).json({ error: "Invalid OTP, please try again." });
        }
    },handleUserSignup2
};