// email.js

const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Function to send an email notification to a patient
const sendNotificationEmail = (patientEmail, message) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: patientEmail,
    subject: 'Notification from Clinic Platform',
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendNotificationEmail };
