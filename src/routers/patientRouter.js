const express = require('express');
const router = new express.Router();
const patientController = require('../controllers/patientController');
const {auth} = require('../middleware/authentication');
let Patient = require('../models/patientModel');

//Import Middlewares
const {
  validateRequest,
  validateUserIdBody,
} = require('../middleware/requestValidator');

router.post(
  '/rateDoctor',
  auth,
  validateUserIdBody,
  validateRequest,
  patientController.rateDoctor
);

router.get(
  '/viewDoctorSlots',
  auth,
  validateUserIdBody,
  validateRequest,
  patientController.viewDoctorSlots
);

router.get(
  '/viewUpcomingSessions',
  auth,
  validateUserIdBody,
  validateRequest,
  patientController.viewUpcomingSessions
);
module.exports = router;
