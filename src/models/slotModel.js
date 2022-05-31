const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Doctor's available slots

const slotSchema = new mongoose.Schema({
    dID: { type: mongoose.SchemaTypes.ObjectId , ref: 'Doctor' },    
    start: {type: Date},
    end: {type: Date},
    date: { type: Date }, 
    booked: {type: Boolean}
},{
    timestamps: true,
});

const Slot = mongoose.model('Slot' , slotSchema);

module.exports = Slot;