const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Doctor's available slots

const slotSchema = new mongoose.Schema({
    dID: { type: ObjectId , ref: 'doctor' },    
    start: {type: Date},
    end: {type: Date},
    date: { type: Date }, 
    booked: {type: Boolean}
},{
    timestamps: true,
});

const Slot = mongoose.model('Patient' , slotSchema);

module.exports = Slot;