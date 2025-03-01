const nodemailer = require("nodemailer");

const sendAccVerificationEmail = async (to, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user:"",
                pass:"",
            },      
        });

        const message = {
            to,
            subject: "Account Verification",
            html: `<p> You are receiving this email because you (or someone else) has requested to verify your account. Please click on the following link, or paste this into your browser to complete the process:</p>
            <p> http://localhost:5173/dashboard/account-verification/${token}</p>
            <p> If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
        };

        const info = await transporter.sendMail(message);
        return info
    } catch (error) {
        throw new Error('Failed to send account verification email');
        
    }
}

module.exports = sendAccVerificationEmail