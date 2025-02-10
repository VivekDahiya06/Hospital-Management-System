//* Get Request Controller
const patientsGet = (request, response) => {
    response.send("This is the Patients Page");
}


module.exports = { patientsGet }