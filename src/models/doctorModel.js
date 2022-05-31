const mongoose = require('mongoose');
const schema = mongoose.Schema;

const doctorSchema = new mongoose.Schema({
    fName: { type: String, required: [true , 'First name is required'], trim: true, minlength: 3 },
    lName: { type: String, required: [true , 'Last name is required'], trim: true, minlength: 3 },
    userName: { type: String, required: [true , 'User name is required'], trim: true, minlength: 3 , unique: true },
    phoneNumber: {type: String, required: [true , 'Phone number is required'], trim: true, minlength: 11 , maxlength: 12 , unique: true },
    email: { type: String, required: [true , 'Email address is required'], trim: true, lowercase: true,  unique: true},
    password: { type: String , required: [true , 'Password is required'], trim: true },
    DoB: {type: Date , required: [true , 'Date of birth is required']},
    gender: {type: String , enum: ['Male', 'Female']},
    dSSN: {type: Number , required: [true , 'Doctor SSN is required'] , min: 10000000000000 , max: 99999999999999 , unique: true },  //Egyptian SSN consists of 14 digits
    specialization: {type: String, required: [true , 'Doctor specialization is required'] , enum: ['Children psychiatry','PTSD']},      //to be edited
    sessionPrice: {type: Number , required: [true , 'Session price is required']},
    rating: [{ type: Number , min:1 , max:5 } , { type:Number, min:0}],   // 5-star rating system  (rating , count)
    patients: [{ type: mongoose.SchemaTypes.ObjectId , ref: 'Patient'}],
    bankAccount: {type: String, required: [true, 'Bank Account in required']},
    passwordChangedAt: {type: Date, select: false},
    forgotPassword: {type: String, select: false},
},{
    timestamps: true,
});

const Doctor = mongoose.model('Doctor' , doctorSchema);

module.exports = Doctor;

