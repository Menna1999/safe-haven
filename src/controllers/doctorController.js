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
  const doctor = req.doctor;
  if(!doctor) throw new LogicError(404, "Doctor not found")
  const appointments = await Appointment.find({dID: doctor._id}); 
  var upcomingSessions = [];
  for(let i=0; i<appointments.length;i++){  
   const slot = await Slot.findById(appointments[i].sID);
   const patient = await Patient.findById(appointments[i].pID);
   const patientName = patient.fName + " " + patient.lName;
   upcomingSessions.push({date: slot.date, patient:patientName});
  }
  
  res.send(upcomingSessions);
 }

 module.exports.selectAvailableSlots = async(req,res)=>{
  
  const dates = req.body.dates;
  const doctor = req.doctor;
  const dID = doctor._id;
  const booked = false;
  const doctorBusy=false;

  for(let i =0; i<dates.length; i++){
    const date = dates[i];
    const slots = await Slot.find({date:date, dID:dID});
    if(slots[0] != undefined) throw new LogicError(403, 'Slot already exists');

    const newSlot = await Slot.create({
      dID,
      date,
      doctorBusy,
      booked
    });
  }
  res.send();
}

module.exports.selectBusySlots = async(req,res)=>{
  
  const dates = req.body.dates;
  const doctor = req.doctor;
  const dID = doctor._id;
  const booked = false;
  const doctorBusy = true;

  for(let i =0; i<dates.length; i++){
    const date = dates[i];
    const slots = await Slot.find({date:date, dID:dID});
    if(slots[0] != undefined) throw new LogicError(403, 'Slot already exists');
    const newSlot = await Slot.create({
      dID,
      date,
      doctorBusy,
      booked
    });
  }
  res.send();
}

module.exports.freeSlots = async(req,res)=>{
  
  const dates = req.body.dates;
  const doctor = req.doctor;
  const dID = doctor._id;


  for(let i =0; i<dates.length; i++){
    const date = dates[i];
    const slots = await Slot.find({date:date, dID:dID});
    for(let j=0; j<slots.length;j++){
      slots[j].doctorBusy = false;
      await slots[j].save();
    }
  }
  res.send("Slots freed up successfully");
}
