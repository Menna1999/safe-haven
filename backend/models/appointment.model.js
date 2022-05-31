const mongoose = require('mongoose');
const schema = mongoose.Schema;

const appointmentSchema = new mongoose.Schema({
    pID: { type: ObjectId , ref: 'patient'},    // Patient ID
    dID: { type: ObjectId , ref: 'doctor' },    // Doctor ID
    sID: { type: ObjectId , ref: 'slot'   },    // Slot ID
},{
    timestamps: true,
});

const Appointment = mongoose.model('Patient' , appointmentSchema);

module.exports = Appointment;
