const mongoose = require('mongoose');
const schema = mongoose.Schema;

const appointmentSchema = new mongoose.Schema({
    pID: { type: mongoose.SchemaTypes.ObjectId , ref: 'Patient'},    // Patient ID
    dID: { type: mongoose.SchemaTypes.ObjectId , ref: 'Doctor' },    // Doctor ID
    sID: { type: mongoose.SchemaTypes.ObjectId , ref: 'Slot'   },    // Slot ID
},{
    timestamps: true,
});

const Appointment = mongoose.model('Appointment' , appointmentSchema);

module.exports = Appointment;
