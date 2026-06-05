const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// OTP EMAIL
const sendOTPEmail = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: `"Eventora" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify Your Eventora Account',
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Welcome to Eventora 🎉</h2>
                    <p>Your OTP for account verification is:</p>

                    <h1 style="
                        color:#2563eb;
                        letter-spacing:6px;
                        text-align:center;
                    ">
                        ${otp}
                    </h1>

                    <p>This OTP is valid for 10 minutes.</p>

                    <p>If you did not request this OTP, please ignore this email.</p>
                </div>
            `
        });

        console.log(`OTP email sent to ${email}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
};

// BOOKING CONFIRMATION EMAIL
const sendBookingEmail = async (
    email,
    userName,
    eventName,
    eventDate,
    venue
) => {
    try {
        await transporter.sendMail({
            from: `"Eventora" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🎟️ Event Booking Confirmed',
            html: `
                <div style="font-family: Arial, sans-serif;">
                    
                    <h2 style="color:#16a34a;">
                        Booking Confirmed ✅
                    </h2>

                    <p>Hello <strong>${userName}</strong>,</p>

                    <p>
                        Your booking for <strong>${eventName}</strong>
                        has been successfully confirmed.
                    </p>

                    <div style="
                        border:1px solid #ddd;
                        padding:15px;
                        border-radius:8px;
                        margin:15px 0;
                    ">
                        <p><strong>Event:</strong> ${eventName}</p>
                        <p><strong>Date:</strong> ${eventDate}</p>
                        <p><strong>Venue:</strong> ${venue}</p>
                    </div>

                    <p>
                        We look forward to seeing you at the event!
                    </p>

                    <p>
                        Regards,<br>
                        Team Eventora 🎉
                    </p>

                </div>
            `
        });

        console.log(`Booking email sent to ${email}`);
    } catch (error) {
        console.error('Error sending booking email:', error);
        throw error;
    }
};

module.exports = {
    sendOTPEmail,
    sendBookingEmail
};