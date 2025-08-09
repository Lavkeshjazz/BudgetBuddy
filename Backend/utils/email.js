const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (options) => {
    try {
        // Create transporter
        console.log("transponder=")
        console.log(JSON.stringify(process.env.EMAIL),JSON.stringify(process.env.EMAIL_PASSWORD))
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // use true for port 465
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Verify SMTP login first
        await transporter.verify();
        console.log('✅ SMTP login successful');

        // Send email
        await transporter.sendMail({
            from: `"${process.env.EMAIL_NAME || 'My App'}" <${process.env.EMAIL}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        });

        console.log(`${options.type || 'Email'} sent successfully`);
    } catch (err) {
        console.error('❌ Error sending email:', err.message);
    }
};

module.exports = sendEmail;
