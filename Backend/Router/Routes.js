const express = require('express');
const router = express.Router();
const { appointmentsGet } = require('../Router/Controller/Appointments.js');
const { patientsGet } = require('../Router/Controller/Patients.js');
const { doctorsGet } = require('../Router/Controller/Doctors.js');


//? Routes for Appointments
//* Get Request
router.route('/appointments').get(appointmentsGet);


//? Routes for Doctors
//* Get Request
router.route('/doctors').get(doctorsGet);


//? Routes for Patients
//* Get Request
router.route('/patients').get(patientsGet);


module.exports = router;