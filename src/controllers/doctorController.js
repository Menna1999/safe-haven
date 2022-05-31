/**
 * User Controller Module contains User's route handler
 * @module controls/doctor
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
 module.exports.viewUpcomingSessions = async(req,res)=>{
 
 }

 module.exports.selectAvailableSlots = async(req,res)=>{
 
}