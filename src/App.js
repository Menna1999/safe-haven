const express = require('express')
const cors = require('cors')
const app = express()
require('express-async-errors');
const path = require('path');
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config({path:'./config/.env'});

//Import Middlewares
const { errorHandler } = require('./middleware/errorHandler');

//Import Errors
const { NotFound } = require('./error/notFound');

//Import Routes
const appointmentRouter = require('./routers/appointmentRouter');
const doctorRouter = require('./routers/doctorRouter');
const patientRouter = require('./routers/patientRouter');
const registerRouter = require('./routers/registerRouter');
//const slotRouter = require('./routers/slotRouter');

//Models
const Patient = require('./models/patientModel');
const Doctor = require('./models/doctorModel');
const Appointment = require('./models/appointmentModel');
const Slot = require('./models/slotModel');

//Configure App
app.use(express.json());
app.use(cors())
app.use('/register', registerRouter);
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/appointment', appointmentRouter);
//app.use('/slot', slotRouter);

const uri = process.env.ATLAS_URI;
console.log(uri)
//mongoose.connect(uri , {useNewUrlParser: true});
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
}).then(async() => {
console.log('Database Connected');}).catch((err)=>{
    console.log(err.message)
});
// const connection = mongoose.connection;
// connection.once('open' , () => {
//     console.log("MongoDB database connection established successfully");
// })

app.use('*', (req, res) => {
    throw new NotFound();
});

//Error Handler
app.use(errorHandler);

module.exports = {
    app
}
