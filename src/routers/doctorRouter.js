const express = require('express');
const router = new express.Router();
const doctorController = require('../controllers/doctorController');
const {auth} = require('../middleware/authentication');
let Doctor = require('../models/doctorModel');

//Import Middlewares
const {
  validateRequest,
  validateUserIdBody,
} = require('../middleware/requestValidator');

router.post(
  '/selectAvailableSlots',
  auth,
  validateRequest,
  doctorController.selectAvailableSlots
);
router.post(
  '/freeSlots',
  auth,
  validateRequest,
  doctorController.freeSlots
);
router.post(
  '/selectBusySlots',
  auth,
  validateRequest,
  doctorController.selectBusySlots
);

router.get(
  '/viewUpcomingSessions',
  auth,
  validateRequest,
  doctorController.viewUpcomingSessions
);
module.exports = router;
