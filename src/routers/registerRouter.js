const express = require('express');
const registerController = require('../controllers/registerController');
const router = new express.Router();
const {auth} = require('../middleware/authentication');

//Import Middlewares
const {
    validateChangePassword,
    validateRequest,
    validateDoctorSignUp,
    validatePatientSignUp,
    validateSignIn,
    validateUserEmailBody,
} = require('../middleware/requestValidator');

router.post(
    '/patientSignUp',
    validatePatientSignUp,
    validateRequest,
    registerController.patientSignUp
);
router.post(
  '/doctorSignUp',
  validateDoctorSignUp,
  validateRequest,
  registerController.doctorSignUp
);

router.post(
    '/patientSignIn', 
    validateSignIn, 
    validateRequest, 
    registerController.patientSignIn
    );

router.post(
  '/doctorSignIn', 
  validateSignIn, 
  validateRequest, 
  registerController.doctorSignIn
  );

router.post(
    '/logout', 
    auth, 
    registerController.logout
    );

router.post(
    '/changePassword', 
    auth, 
    validateChangePassword, 
    validateRequest, 
    registerController.changePassword);

module.exports = router;
