/**
 * User Controller Module contains User's route handler
 * @module controls/register
 */

/**
 * Patient Model
 * @const
 */
 const Patient = require('../models/patientModel');

 /**
  * Doctor Model
  * @const
  */
  const Doctor = require('../models/doctorModel');
 /**
  * Appointment Model
  * @const
  */
  const Appointment = require('../models/appointmentModel');
 
 /**
  * Slot Model
  * @const
  */
  const Slot = require('../models/slotModel');
 
 /**
  * LogicError Class used to throw logical error in route handlers
  * @const
  */
 const { LogicError } = require('../error/logicError');

 // req has the id of the doctor, and the rating entered by patient
 module.exports.patientSignUp = async(req,res)=>{
 }
 module.exports.doctorSignUp = async(req,res)=>{
}
module.exports.signIn = async(req,res)=>{
}
module.exports.logout = async(req,res)=>{
}
module.exports.forgotPassword = async(req,res)=>{
}
module.exports.changePassword = async(req,res)=>{
}
module.exports.resetPassword = async(req,res)=>{
}