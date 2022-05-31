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
   //Chec if email already exists
   const { email, password, firstName, lastName, age } = req.body;
   if (await User.findOne({ email })) {
       throw new LogicError(403, 'User Already Exists');
   }

   // Check username exists 

   //Create new User
   const userName = email.split('@')[0];
   const newUser = await User.create({
       email,
       password,
       firstName,
       lastName,
       userName,
       age,
   });

   //Create New token
   const token = newUser.signToken(newUser._id);
   newUser.accessToken = token;
   await newUser.save();
   res.status(201).json({
       accessToken: token,
       user:newUser
   });
 }
 module.exports.doctorSignUp = async(req,res)=>{
}
module.exports.patientSignIn = async(req,res)=>{
  const { email, password } = req.body;

  //Check that email exists
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.correctPassword(password, user.password))) {
      throw new LogicError(401, 'Invalid Credentials');
  }

  //Create new Access token
  const token = user.signToken(user._id);
  newUser.accessToken = token;
  await newUser.save();
  res.status(200).json({
      accessToken: token,
      user
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
