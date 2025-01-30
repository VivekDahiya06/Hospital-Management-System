import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sign_In from './Pages/Sign_In'
import Home from './Pages/Home'
import Appointments from './Pages/Appointments'
import Header from './components/Header'
import Doctors from './Pages/Doctors'
import Patients from './Pages/Patients'

const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Sign_In />} />
          <Route path='/' element={<Home />} />
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/patients' element={<Patients />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
