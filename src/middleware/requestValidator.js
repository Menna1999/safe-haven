const { validationResult, body, param } = require('express-validator');
const { RequestValidationError } = require('../error/requestValidation');
/**
 * validates the request and checks if there are errors
 * @param  {Object} req
 * @param  {Object} res
 * @param  {function} next
 */
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    next();
};

//Body Validations
const validateChangePassword = [
    body('oldPassword')
        .isString()
        .withMessage('Old password is required')
        .isLength({ min: 8 })
        .withMessage('Old Password must be more than 8 characters'),
    body('newPassword')
        .isString()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('New Password must be more than 8 characters'),
];
const validateUserIdBody = [
    body('userId').isMongoId().withMessage('User Id is missing'),
];

const validateDoctorSignUp = [
    body('email').isEmail().withMessage('Email is required'),
    body('password')
        .isString()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be more than 8 characters'),
    body('fName').isString().withMessage('First Name is required'),
    body('lName').isString().withMessage('Last Name is required'),
    body('DoB').isDate().withMessage('Date of birth is required'),
    body('username').isAlphanumeric().withMessage('Username is required'),
    body('gender').isString().withMessage('Gender is requried'),
    body('specialization').isString().withMessage('Specialization is required'),
    body('phoneNumber').isString().withMessage('Phone number is required'),
    body('dSSN').isString().withMessage('DSSN is required'),
    body('sessionPrice').isNumeric().withMessage('Session Price is required'),
    body('bankAccount').isString().withMessage('Bank Account Number is required'),
    
];
const validatePatientSignUp = [
    body('email').isEmail().withMessage('Email is required'),
    body('password')
        .isString()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be more than 8 characters'),
    body('fName').isString().withMessage('First Name is required'),
    body('lName').isString().withMessage('Last Name is required'),
    body('DoB').isDate().withMessage('Date of birth is required'),
    body('username').isAlphanumeric().withMessage('Username is required'),
    body('gender').isString().withMessage('Gender is requried'),
    body('phoneNumber').isString().withMessage('Phone number is required'),
    body('creditCard').isAlphanumeric().withMessage('Credit Card is required'),

];
const validateSignIn = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isString().withMessage('Password is required'),
];

const validateUserEmailBody = [
    body('email').isEmail().withMessage('Email is required'),
];

const validateUserIdParam = [
    param('userId').isMongoId().withMessage('UserId is required'),
];


const validateSearchKeywordParam = [
    param('searchKeyword').isString().withMessage('searchKeyword is required'),
];


module.exports = {
    validateRequest,
    validatePatientSignUp,
    validateDoctorSignUp,
    validateSignIn,
    validateUserIdParam,
    validateUserIdBody,
    validateChangePassword,
    validateUserEmailBody,
};
