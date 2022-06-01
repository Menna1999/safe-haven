const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Doctor's available slots

const slotSchema = new mongoose.Schema({
    dID: { type: mongoose.SchemaTypes.ObjectId , ref: 'Doctor' },    
    date: { type: Date }, 
    doctorBusy: {type: Boolean},
    booked: {type: Boolean}
},{
    timestamps: true,
});

const Slot = mongoose.model('Slot' , slotSchema);

module.exports = Slot;