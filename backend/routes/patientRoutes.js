// /routes/patientRoutes.js

const express = require('express');
const router = express.Router();
const { isDoctor } = require('../middlewares/auth'); // Import the 'isDoctor' middleware
const patientController = require('../controllers/patientController');

// Create a new patient profile
router.post('/patient', isDoctor, patientController.createProfile);

// Retrieve a list of all patient profiles (accessible to doctors only)
router.get('/patients', isDoctor, patientController.getAllProfiles);

// Retrieve a specific patient profile by ID (accessible to doctors only)
router.get('/patient/:patientId', isDoctor, patientController.getProfileById);

// Update a patient profile by ID (accessible to doctors only)
router.put('/patient/:patientId', isDoctor, patientController.updateProfile);

// Delete a patient profile by ID (accessible to doctors only)
router.delete('/patient/:patientId', isDoctor, patientController.deleteProfile);

router.post('/send-email/:patientId', patientController.sendEmail);


module.exports = router;



/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient profile operations
 */

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new patient profile
 *     tags: [Patients]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               medicalHistory:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *     responses:
 *       '201':
 *         description: Patient profile created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Retrieve a list of all patient profiles (accessible to doctors only)
 *     tags: [Patients]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: List of patient profiles
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/patients/{patientId}:
 *   get:
 *     summary: Retrieve a specific patient profile by ID (accessible to doctors only)
 *     tags: [Patients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         description: ID of the patient profile to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Patient profile
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Access denied
 *       '404':
 *         description: Patient profile not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/patients/{patientId}:
 *   put:
 *     summary: Update a patient profile by ID (accessible to doctors only)
 *     tags: [Patients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         description: ID of the patient profile to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               medicalHistory:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *     responses:
 *       '200':
 *         description: Patient profile updated successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Access denied
 *       '404':
 *         description: Patient profile not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/patients/{patientId}:
 *   delete:
 *     summary: Delete a patient profile by ID (accessible to doctors only)
 *     tags: [Patients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         description: ID of the patient profile to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Patient profile deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Access denied
 *       '404':
 *         description: Patient profile not found
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/send-email/{patientId}:
 *   post:
 *     summary: Send an email notification to a patient.
 *     tags:
 *       - Email
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: string
 *         description: The ID of the patient.
 *         required: true
 *       - in: body
 *         name: message
 *         schema:
 *           type: string
 *         description: The message to be sent in the email.
 *         required: true
 *     responses:
 *       200:
 *         description: Email sent successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Patient profile not found.
 *       500:
 *         description: Internal server error.
 */

