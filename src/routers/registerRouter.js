const express = require('express');
const registerController = require('../controllers/registerController');
const router = new express.Router();
const {auth} = require('../middleware/authentication');

//Import Middlewares
const {
    validateChangePassword,
    validateRequest,
    validateSignUp,
    validateLogIn,
    validateUserEmailBody,
    validateResetPassword
} = require('../middleware/requestValidator');

router.post(
    '/patientSignUp',
    validateSignUp,
    validateRequest,
    registerController.patientSignUp
);
router.post(
  '/doctorSignUp',
  validateSignUp,
  validateRequest,
  registerController.doctorSignUp
);

router.post(
    '/patientSignIn', 
    validateLogIn, 
    validateRequest, 
    registerController.patientSignIn
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
