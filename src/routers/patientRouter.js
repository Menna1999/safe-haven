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
  validateRequest,
  patientController.rateDoctor
);

router.get(
  '/viewDoctorBusySlots',
  auth,
  validateRequest,
  patientController.viewDoctorBusySlots
);

router.get(
  '/viewUpcomingSessions',
  auth,
  validateRequest,
  patientController.viewUpcomingSessions
);

router.post(
  '/bookSession',
  auth,
  validateRequest,
  patientController.bookSession
);

router.post(
  '/cancelSession',
  auth,
  validateRequest,
  patientController.cancelSession
);
module.exports = router;
