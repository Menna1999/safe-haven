/**
 * User Controller Module contains User's route handler
 * @module controls/appointment
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

 module.exports.sendLinkToPatient = async(req,res)=>{
   
 }

 module.exports.sendLinkToDoctor = async(req,res)=>{
   
}