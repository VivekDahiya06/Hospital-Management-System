//? Controller for Doctors

//* Get Request Controller
const doctorsGet = (request, response) => {
    response.send("This is the Doctors Page");
}


module.exports = { doctorsGet }