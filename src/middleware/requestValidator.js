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
    body('oldPass')
        .isString()
        .withMessage('Old password is required')
        .isLength({ min: 8 })
        .withMessage('Old Password must be more than 8 characters'),
    body('newPass')
        .isString()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('New Password must be more than 8 characters'),
];
const validateUserIdBody = [
    body('userId').isMongoId().withMessage('User Id to be followed is missing'),
];
const validateRegisterWithFacebook = [
    body('accessToken').isString().withMessage('Access Token is missing'),
];
const validateSignUp = [
    body('email').isEmail().withMessage('Email is required'),
    body('password')
        .isString()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be more than 8 characters'),
    body('firstName').isString().withMessage('First Name is required'),
    body('lastName').isString().withMessage('Last Name is required'),
    body('age').isNumeric().withMessage('Age is required'),
];
const validateLogIn = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isString().withMessage('Password is required'),
];

const validateUserEmailBody = [
    body('email').isEmail().withMessage('Email is required'),
];

const validateUserIdParam = [
    param('userId').isMongoId().withMessage('UserId is required'),
];

const validateResetPassword = [
    body('email').isEmail().withMessage('Email is required'),
    body('newPass')
        .isString()
        .withMessage('New Password is required')
        .isLength({ min: 8 })
        .withMessage('New Password must be more than 8 characters'),
    body('code').isString().withMessage('Code is required'),
];

const validateSearchKeywordParam = [
    param('searchKeyword').isString().withMessage('searchKeyword is required'),
];



module.exports = {
    validateRequest,
    validateSignUp,
    validateLogIn,
    validateUserIdParam,
    validateUserIdBody,
    validateChangePassword,
    validateUserEmailBody,
    validateRegisterWithFacebook,
    validateSearchKeywordParam,
    validateResetPassword,
};
