const router = require('express').Router();
let Appointment = require('../models/appointment.model');

router.route('/').get((req, res) => {
    Appointment.find()
    .then(appointments => res.json(appointments))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*
router.route('/add').post((req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const userName = req.body.userName;

  const newAppointment = new Doctor({
    fName,
    lName,
    userName,
    phoneNumber,
    email,
    password,
    DoB,
    gender,
    dSSN,
    specialization,
    sessionPrice,
    rating,
    patients
  });

  newDoctor.save()
  .then(() => res.json('Doctor added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
  Doctor.findById(req.params.id)
    .then(doctor => res.json(doctor))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Doctor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Doctor deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Doctor.findById(req.params.id)
    .then(doctor => {
      doctor.fName = req.body.fName;
      doctor.lName = req.body.lName;
      doctor.userName = req.body.userName;
      doctor.phoneNumber = req.body.phoneNumber;
      doctor.email = req.body.email;
      doctor.password = req.body.password;
      doctor.DoB = Date.parse(req.body.DoB);
      doctor.gender = req.body.gender;
      doctor.dSSN = Number(req.body.dSSN);
      doctor.specialization = req.body.specialization;
      doctor.sessionPrice = Number(req.body.sessionPrice);
      doctor.rating = Number(req.body.rating);
      doctor.patients = req.body.patients;   ///// to be edited by controllers

      doctor.save()
        .then(() => res.json('Doctor updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
*/