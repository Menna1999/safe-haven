const express = require('express');
const router = new express.Router();
const appointmentController = require('../controllers/appointmentController');
let Appointment = require('../models/appointmentModel');

//Import Middlewares
const {
  validateRequest,
} = require('../middleware/requestValidator');

router.post(
  '/patientLink',
  validateRequest,
  appointmentController.sendLinkToPatient
);

router.post(
  '/doctorLink',
  validateRequest,
  appointmentController.sendLinkToDoctor
);
module.exports = router;