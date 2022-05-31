/**
 * User Controller Module contains User's route handler
 * @module controls/patient
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

 var valid = require('card-validator');

 // Assume req has the id of the doctor, and the rating entered by patient
 module.exports.rateDoctor = async(req,res)=>{
   const rating = req.body.rating;
   const doctorId = req.body.doctorId;

   //Check if doctor exists
   const doctor = await Doctor.findById(doctorId);
   if (!doctor) throw new LogicError(404, 'Doctor not found');
   
  //Get current doctor rating
  
  oldRating = doctor.rating[0];
  numRatings = doctor.rating[1] + 1;

  newRating = oldRating + rating/numRatings;
  
  //Update doctor rating
  doctor.rating[0] =  newRating;
  doctor.rating[1] = numRatings;

  await doctor.save();
  res.send();
 }

 module.exports.viewDoctorSlots = async(req,res)=>{
 
}

module.exports.viewUpcomingSessions = async(req,res)=>{
 
}

// Assume req has input credit card number
module.exports.addCreditCard = async(req,res)=>{
creditCard = req.body.creditCard;
cardValidation = valid.number(creditCard);

if (!cardValidation.isPotentiallyValid) {
  renderInvalidCardNumber();
}

if (numberValidation.card) {
  //Add card
}

}
