const express = require('express');
const router = new express.Router();
const doctorController = require('../controllers/doctorController');
const {auth} = require('../middleware/authentication');
let Doctor = require('../models/doctorModel');

//Import Middlewares
const {
  validateRequest,
  validateUserIdBody,
} = require('../middleware/requestValidator');
router.post(
  'selectAvaiableSlots',
  auth,
  validateUserIdBody,
  validateRequest,
  doctorController.selectAvailableSlots
);

router.get(
  'viewUpcomingSessions',
  auth,
  validateUserIdBody,
  validateRequest,
  doctorController.viewUpcomingSessions
);
module.exports = router;


// const router = require('express').Router();
// let Doctor = require('../models/doctorModel');

// router.route('/').get((req, res) => {
//   Doctor.find()
//     .then(doctors => res.json(doctors))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//   const fName = req.body.fName;
//   const lName = req.body.lName;
//   const userName = req.body.userName;
//   const phoneNumber = req.body.phoneNumber;
//   const email = req.body.email;
//   const password = req.body.password;
//   const DoB = Date.parse(req.body.DoB);
//   const gender = req.body.gender;
//   const dSSN = Number(req.body.dSSN);
//   const specialization = req.body.specialization;
//   const sessionPrice = Number(req.body.sessionPrice);
//   const rating = Number(req.body.rating);
//   const patients = req.body.patients;

//   const newDoctor = new Doctor({
//     fName,
//     lName,
//     userName,
//     phoneNumber,
//     email,
//     password,
//     DoB,
//     gender,
//     dSSN,
//     specialization,
//     sessionPrice,
//     rating,
//     patients
//   });

//   newDoctor.save()
//   .then(() => res.json('Doctor added!'))
//   .catch(err => res.status(400).json('Error: ' + err));
// });


// router.route('/:id').get((req, res) => {
//   Doctor.findById(req.params.id)
//     .then(doctor => res.json(doctor))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//     Doctor.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Doctor deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//     Doctor.findById(req.params.id)
//     .then(doctor => {
//       doctor.fName = req.body.fName;
//       doctor.lName = req.body.lName;
//       doctor.userName = req.body.userName;
//       doctor.phoneNumber = req.body.phoneNumber;
//       doctor.email = req.body.email;
//       doctor.password = req.body.password;
//       doctor.DoB = Date.parse(req.body.DoB);
//       doctor.gender = req.body.gender;
//       doctor.dSSN = Number(req.body.dSSN);
//       doctor.specialization = req.body.specialization;
//       doctor.sessionPrice = Number(req.body.sessionPrice);
//       doctor.rating = Number(req.body.rating);
//       doctor.patients = req.body.patients;   ///// to be edited by controllers

//       doctor.save()
//         .then(() => res.json('Doctor updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// module.exports = router;
