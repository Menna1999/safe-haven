const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const { LogicError } = require('../error/logicError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
//const { redisClient, getAsync, setAsync } = require('../third-Parties/redis');
/**
 * The authentication function used before any request that require a user to be logged in.
 * it checks the validity of the token.
 * @param  {Object} req
 * @param  {Object} res
 * @param  {function} next
 * @function
 */
const auth = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
        req.token = token;
    }
    if (!token) {
        throw new LogicError(
            401,
            'You are not logged in! Please log in to continue'
        );
    }
    let decoded;
    try {
        decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new LogicError(
            401,
            'Token may be Invalid or Expired! Please log in to continue'
        );
    }
    
    if(decoded.type == 'Patient'){
        const patient = await Patient.findOne({_id:decoded.id, accessToken: token}).select("+password");
        if (!patient) {
            throw new LogicError(
                401,
                'The patient that belongs to this token does not exist'
            );
        }
        req.patient = patient;
    }else if(decoded.type == 'Doctor'){
        const doctor = await Doctor.findOne({_id:decoded.id, accessToken: token}).select("+password");
        if (!doctor) {
            throw new LogicError(
                401,
                'The doctor that belongs to this token does not exist'
            );
        }
        req.doctor = doctor;
    }

    next();
};

module.exports = {
    auth,
};
