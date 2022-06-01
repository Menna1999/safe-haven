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
 module.exports.doctorSignUp = async(req,res)=>{
   
  //Check if email already exists
   const { fName, lName, username, phoneNumber ,email, password, DoB, gender, dSSN, specialization, sessionPrice, bankAccount } = req.body;
   if (await Doctor.findOne({ email })) {
       throw new LogicError(403, 'User Already Exists');
   }

   // Check if username exists 
   if (await Doctor.findOne({ username })) {
    throw new LogicError(403, 'Username Taken');
}
   //Create new Doctor
  
   const newDoctor = await Doctor.create({
       fName,
       lName,
       username,
       phoneNumber,
       email,
       password,
       DoB,
       gender,
       dSSN,
       specialization,
       sessionPrice,
       bankAccount,
   });

   //Create New token
   const token = newDoctor.signToken(newDoctor._id);
   newDoctor.accessToken = token;
   await newDoctor.save();
   res.status(201).json({
       accessToken: token,
       user:newDoctor
   });
 }
 module.exports.patientSignUp = async(req,res)=>{

  
  //Check if email already exists
  const { fName, lName, username, phoneNumber ,email, password, DoB, gender, creditCard } = req.body;
  if (await Patient.findOne({ email })) {
      throw new LogicError(403, 'User Already Exists');
  }

  // Check if username exists 
  if (await Patient.findOne({ username })) {
   throw new LogicError(403, 'Username Taken');
}
  //Create new Patient
  const newPatient = await Patient.create({
      fName,
      lName,
      username,
      phoneNumber,
      email,
      password,
      DoB,
      gender,
      creditCard,
  });

  //Create New token
  const token = newPatient.signToken(newPatient._id);
  newPatient.accessToken = token;
  await newPatient.save();
  res.status(201).json({
      accessToken: token,
      user:newPatient
  });

}
module.exports.patientSignIn = async(req,res)=>{
  const { email, password } = req.body;

  //Check that email exists
  const patient = await Patient.findOne({ email }).select('+password')
  if (!patient || !(await patient.correctPassword(password, patient.password))) {
      throw new LogicError(401, 'Invalid Credentials');
  }

  //Create new Access token
  const token = patient.signToken(patient._id);
  patient.accessToken = token;
  await patient.save();
  res.status(200).json({
      accessToken: token,
      user:patient
  });

}
module.exports.doctorSignIn = async(req,res)=>{
  const { email, password } = req.body;

  //Check that email exists
  const doctor = await Doctor.findOne({ email }).select('+password')
  if (!doctor || !(await doctor.correctPassword(password, doctor.password))) {
      throw new LogicError(401, 'Invalid Credentials');
  }

  //Create new Access token
  const token = doctor.signToken(doctor._id);
  doctor.accessToken = token;
  await doctor.save();
  res.status(200).json({
      accessToken: token,
      user: doctor
  });

}
module.exports.logout = async(req,res)=>{
  const user = req.doctor || req.patient ;
  user.accessToken = undefined;
  await user.save();
  res.send("User logged out successfully");
}

module.exports.changePassword = async(req,res)=>{
  const user = req.doctor || req.patient;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  if (!user || !(await user.correctPassword(oldPassword, user.password))) {
    throw new LogicError(401, 'Invalid Password');
}
user.password = newPassword;
await user.save();
res.send("Password changed successfully");
}
