// /controllers/patientController.js

const PatientProfile = require('../models/PatientProfile');

const transporter = require('../mailer'); // Import the Nodemailer transporter


// Create a new patient profile
exports.createProfile = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, medicalHistory } = req.body;

    const patientProfile = new PatientProfile({
      firstName,
      lastName,
      dateOfBirth,
      medicalHistory,
      doctor: req.user.id, // Assuming you're storing the doctor's ID in the request user object
    });

    await patientProfile.save();
    res.status(201).json(patientProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve a list of all patient profiles (accessible to doctors only)
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await PatientProfile.find({ doctor: req.user.id });
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve a specific patient profile by ID (accessible to doctors only)
exports.getProfileById = async (req, res) => {
  try {
    const patientProfile = await PatientProfile.findOne({
      _id: req.params.patientId,
      doctor: req.user.id,
    });

    if (!patientProfile) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    res.json(patientProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a patient profile by ID (accessible to doctors only)
exports.updateProfile = async (req, res) => {
    try {
      const { firstName, lastName, dateOfBirth, medicalHistory } = req.body;
      const patientId = req.params.patientId;
  
      // Check if the patient profile exists and belongs to the doctor
      const patientProfile = await PatientProfile.findOne({
        _id: patientId,
        doctor: req.user.id,
      });
  
      if (!patientProfile) {
        return res.status(404).json({ message: 'Patient profile not found' });
      }
  
      // Update the patient profile fields
      patientProfile.firstName = firstName;
      patientProfile.lastName = lastName;
      patientProfile.dateOfBirth = dateOfBirth;
      patientProfile.medicalHistory = medicalHistory;
  

         // After successfully updating the profile, send a notification email
    const patientEmail = 'patient@example.com'; // Replace with the patient's email
    const notificationMessage = 'Your patient profile has been updated.';
    sendNotificationEmail(patientEmail, notificationMessage);

          // Save the updated patient profile

      await patientProfile.save();
  
      res.json({ message: 'Patient profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// Delete a patient profile by ID (accessible to doctors only)
exports.deleteProfile = async (req, res) => {
  try {
    const patientProfile = await PatientProfile.findById(req.params.patientId);

    if (!patientProfile) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    await patientProfile.remove();
    res.json({ message: 'Patient profile deleted successfully' });
} 
    // Implement patient profile deletion logic here...
    // You can use findByIdAndDelete or similar methods to delete the profile
 catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// send an email to the patient

exports.sendEmail = async (req, res) => {
    try {
        const patientProfile = await PatientProfile.findById(req.params.patientId);
    
        if (!patientProfile) {
        return res.status(404).json({ message: 'Patient profile not found' });
        }
    
        const mailOptions = {
        from: ' <your email address>',
        to: patientProfile.email,
        subject: 'Notification from Clinic Platform',
        text: req.body.message,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          }
        );

        res.json({ message: 'Email sent successfully' });
        }
         catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        }
    };
