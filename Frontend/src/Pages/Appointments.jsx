import React, { useEffect } from 'react'
import Header from '../components/Header'
import axios from 'axios';

const Appointments = () => {

  
  useEffect(() => {
    fetchAppointmentData();
  }, [])
  

  async function fetchAppointmentData() {
    try {
      const appointment_Api_Request = await axios.get('http://localhost:5000/appointments');
      console.log(appointment_Api_Request.data);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  return (
    <>
      <Header />
      <div>
      This is appointments Component
    </div>
    </>
    
  )
}

export default Appointments
