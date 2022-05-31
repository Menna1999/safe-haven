const mongoose = require('mongoose');
const schema = mongoose.Schema;

const patientSchema = new mongoose.Schema({
    fName: { type: String, required: [true , 'First name is required'], trim: true, minlength: 3 },
    lName: { type: String, required: [true , 'Last name is required'], trim: true, minlength: 3 },
    userName: { type: String, required: [true , 'User name is required'], trim: true, minlength: 3 , unique: true },
    phoneNumber: {type: String, required: [true , 'Phone number is required'], trim: true, minlength: 11 , maxlength: 12 , unique: true },
    email: { type: String, required: [true , 'Email address is required'], trim: true, lowercase: true,  unique: true, validate: [validateEmail, 'Please fill a valid email address'] },
    password: { type: String , required: [true , 'Password is required'], trim: true },
    DoB: {type: Date , required: [true , 'Date of birth is required']},
    gender: {type: String , enum: ['Male', 'Female']},
    journalEntries: [({type: String},{type: Date})],  // [(entry1 , date) , (entry2 , date) , ...]
    doctors: [{ type: ObjectId , ref: 'doctor'}],
    suicidal: { type: Boolean },     
},{
    timestamps: true,
});

const Patient = mongoose.model('Patient' , patientSchema);

module.exports = Patient;
