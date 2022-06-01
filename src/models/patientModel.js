const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const patientSchema = new mongoose.Schema({
    fName: { type: String, required: [true , 'First name is required'], trim: true, minlength: 3 },
    lName: { type: String, required: [true , 'Last name is required'], trim: true, minlength: 3 },
    username: { type: String, required: [true , 'User name is required'], trim: true, minlength: 3 , unique: true },
    phoneNumber: {type: String, required: [true , 'Phone number is required'], trim: true, minlength: 11 , maxlength: 12 , unique: true },
    email: { type: String, required: [true , 'Email address is required'], trim: true, lowercase: true,  unique: true },
    password: { type: String , required: [true , 'Password is required'], trim: true, select:false },
    DoB: {type: Date , required: [true , 'Date of birth is required']},
    gender: {type: String , required: [true , 'Gender is required'] ,enum: ['Male', 'Female']},
    journalEntries: [[{type: String},{type: Date}]],  // [(entry1 , date) , (entry2 , date) , ...]
    doctors: [{ type: mongoose.SchemaTypes.ObjectId , ref: 'Doctor'}],
    suicidal: { type: Boolean, default: false},
    creditCard: [{type: String,  trim:true, required:true}, {type: String, trim:true, required:true}, {type: Date, required:true}, {type: Number, required:true}],
    profilePhotoUrl:{type: String, default: process.env.HOSTNAME + "public/images/default.png"},
    notifications: [{type: String, default:""}],
    accessToken: {type:String}

},{
    timestamps: true,
});


patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
patientSchema.methods.correctPassword = async function (
    passwordToBeChecked,
    originalPassword
) {
    return await bcrypt.compare(passwordToBeChecked, originalPassword);
};
patientSchema.methods.signToken = (id) => {
    return jwt.sign({ id, type: 'Patient' }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const Patient = mongoose.model('Patient' , patientSchema);

module.exports = Patient;
