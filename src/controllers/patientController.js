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
   const patient = req.patient;
   if(!patient) throw new LogicError(404, "Patient not found")
   const rating = Number(req.body.rating);
   const doctorId = req.body.doctorId;

   //Check if doctor exists
   const doctor = await Doctor.findById(doctorId);
   if (!doctor) throw new LogicError(404, 'Doctor not found');
   
  //Get current doctor rating
  
  const oldRating = doctor.rating[0];
  const numVotes = doctor.rating[1];
  if(oldRating != undefined){
    const newRating = (oldRating*numVotes+ rating)/(numVotes +1) ;
    //Update doctor rating
    doctor.rating[0] =  newRating;
    doctor.rating[1] = numVotes+1;
  }else{
    doctor.rating[0] = rating;
    doctor.rating[1] = 1;
  }

  await doctor.save();
  res.send("Doctor Rated Successfully");
 }

 module.exports.viewDoctorBusySlots = async(req,res)=>{
  const doctorId = req.body.doctorId;
  const doctor = await Doctor.findById(doctorId);
  if(!doctor) throw new LogicError(404, 'Doctor not found')
  //Retrieve all slots with doctor Id
  const slots = await Slot.find({dID: doctorId});
  if(slots[0] == undefined) throw new LogicError(404, 'No slots found')
  var bookedSlotDates = []; 
  for(let i=0; i<slots.length; i++){
    if(slots[i].booked == true || slots[i].doctorBusy == true){
      bookedSlotDates.push(slots[i].date);
    }
  }
 //Return slots that arent booked
  res.send(bookedSlotDates);
}

module.exports.bookSession = async(req,res)=>{
  const patient = req.patient;
  if(!patient) throw new LogicError(404, "Patient not found")
  const dID = req.body.doctorId;
  const date = req.body.date;
  //Retrieve all slots with doctor Id and chosen date
  const slots = await Slot.find({dID: dID, date:date}); 
  if(slots[0] != undefined) throw new LogicError(403, "Slot is busy");
 
  const doctorBusy=false;
  const booked=true;
  const newSlot = await Slot.create({
    dID,
    date,
    doctorBusy,
    booked
  });

  const pID = patient._id;
  const sID = newSlot._id;
  const newAppointment = await Appointment.create({
    pID,
    dID,
    sID
  });

  res.send("Session booked successfully");
}
module.exports.cancelSession = async(req,res)=>{
  const patient = req.patient;
  if(!patient) throw new LogicError(404, "Patient not found")
  const dID = req.body.doctorId;
  const date = req.body.date;
  //Retrieve all slots with doctor Id and chosen date
  const slots = await Slot.find({dID: dID, date:date}); 
  console.log(slots[0]);
  if(slots[0] == undefined) throw new LogicError(404, "Slot not found");
  for(let i=0; i<slots.length;i++){
    const sID = slots[i]._id;
    if(slots[i].booked == false) throw new LogicError(403, 'Session was not booked')
    const appointment = await Appointment.find({sID:sID});
    await Appointment.findByIdAndDelete(appointment[0]._id).then(async() => {
    await Slot.findByIdAndDelete(sID);});
  }

  res.send("Session cancelled successfully");
}
module.exports.viewUpcomingSessions = async(req,res)=>{
 const patient = req.patient;
 const appointments = await Appointment.find({pID: patient._id}); 
 var upcomingSessions = [];
 for(let i=0; i<appointments.length;i++){  
  const slot = await Slot.findById(appointments[i].sID);
  const doctor = await Doctor.findById(slot.dID);
  const doctorName = doctor.fName + " " + doctor.lName;
  upcomingSessions.push({date: slot.date, doctor:doctorName});
 }
 
 res.send(upcomingSessions);
}

// Assume req has input credit card number
module.exports.addCreditCard = async(req,res)=>{
const creditCard = req.body.creditCard;
const cardValidation = valid.number(creditCard);

if (!cardValidation.isPotentiallyValid) {
  renderInvalidCardNumber();
}

if (cardValidation.card) {
  //Add card
}

}
