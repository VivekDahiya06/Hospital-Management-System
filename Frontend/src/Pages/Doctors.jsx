import React, { useContext, useEffect, useState } from 'react'
import styles from './styles/Doctors.module.css'
import Doctor_Card from '../components/Doctor_Card'
import { Alert, Button, Dialog, DialogContent, DialogTitle, FormControlLabel, FormLabel, Radio, RadioGroup, Snackbar, TextField } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import BackdropModal from '../components/BackdropModal'
import Header from '../components/Header'
import { GrDocumentUpdate } from "react-icons/gr";
import { AppContext } from '../Store/Context';
import No_Doctors_Found from '../assets/Images/No_Doctors_Found.png';
import { useDispatch, useSelector } from 'react-redux';
import { Form_Open_And_Close } from '../Redux/Features/Form_Open_Slice';
import { Alert_Close, Alert_Open } from '../Redux/Features/AlertSlice'
import { Delete_Alert_Close } from '../Redux/Features/Doctors/Delete_Slice'
import { Reset_Doctors_Details, Set_Doctors_Details } from '../Redux/Features/Doctors/Add_Slice'
import { Reset_Edit_Doctors_Details } from '../Redux/Features/Doctors/Edit_Slice'

const Doctors = () => {

  const dispatch = useDispatch();
  const formOpen = useSelector((state) => state.form_open.add_open);
  const editFormOpen = useSelector((state) => state.form_open.edit_open);
  const alertOpen = useSelector((state) => state.alert.open);
  const alertMessage = useSelector((state) => state.alert.message);
  const deleteAlert = useSelector((state) => state.Doctors_delete.alert_open);
  const deleteIndex = useSelector((state) => state.Doctors_delete.index);
  const formData = useSelector((state) => state.Doctors_add.add_form_data);


  const {
    GlobalData: {
      Doctors_Data,
      DoctorDataState,
    }
  } = useContext(AppContext);

  const MotionButton = motion.create(Button);
  
  const [doctor_Data, setDoctor_Data] = DoctorDataState;


  useEffect(() => {
    setDoctor_Data([...Doctors_Data]);
  }, [])




  // Function to Open or Close Doctor Add Form / Edit Form
  const openAndCloseDoctorForm = (type) => {

    if (formData.name || formData.experience || formData.gender || formData.location || formData.specialization || formData.image) {
      dispatch(Reset_Doctors_Details());
    }

    dispatch(Form_Open_And_Close(type));
  }


  // Function to handle form submission
  const add_formHandler = (e) => {

    e.preventDefault();
    if (!formData.name || !formData.experience || !formData.gender || !formData.location || !formData.specialization) {
      dispatch(Alert_Open("Please Fill All The Fields"));
      return;
    }

    else if (!formData.image) {
      dispatch(Alert_Open("Image Not Found !!"));
      return;
    }

    console.log(formData);

    doctor_Data.push(formData);
    dispatch(Alert_Close());
    dispatch(Reset_Doctors_Details());
    dispatch(Form_Open_And_Close('add_form'));
  }


  // Function to handle form submission
  const edit_formHandler = (e) => {

    e.preventDefault();
    if (!formData.name || !formData.experience || !formData.gender || !formData.location || !formData.specialization) {
      dispatch(Alert_Open("Please Fill All The Fields"));
      return;
    }

    else if (!formData.image) {
      dispatch(Alert_Open("Image Not Found !!"));
      return;
    }

    console.log(formData);

    doctor_Data.splice(deleteIndex, 1, formData);
    dispatch(Alert_Close());
    dispatch(Reset_Doctors_Details());
    dispatch(Form_Open_And_Close('edit_form'));
  }


  // Function to handle input change
  const handleInputChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image" && files[0]) {

      const file = files[0];
      if (file.type.startsWith("image/")) {

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          dispatch(Set_Doctors_Details({ [name]: reader.result }));
          dispatch(Alert_Close());
        };
        return;
      }
    }

    dispatch(Set_Doctors_Details({ [name]: value }));
  };


  return (
    <>

      <Header />

      {
        doctor_Data.length === 0 ? (
          <div className={styles.NotFoundContainer}>
            <div className={styles.NotFoundImageContainer}>
              <h1>No Doctors Found</h1>
              <img src={No_Doctors_Found} alt='No Doctors' style={{ width: "50%", height: "50%" }} />
            </div>
            <MotionButton
              whileHover={{ scale: 1.1 }}
              variant="contained"
              sx={{
                fontSize: "1.2rem",
                width: "5em",
                margin: "0.8em 0",
                "@media screen and (width <= 520px)": {
                  width: "70%",
                }
              }}
              onClick={() => openAndCloseDoctorForm('add_form')}
            >
              Add
            </MotionButton>
          </div>
        ) : (
          <div className={styles.mainContainer}>
            <div className={styles.Container}>
              {
                doctor_Data.map((doctor, index) => (
                  <Doctor_Card key={index} doctor={doctor} index={index} />
                ))
              }
            </div>
            <MotionButton
              whileHover={{ scale: 1.1 }}
              variant="contained"
              sx={{
                fontSize: "1.2rem",
                width: "5em",
                margin: "0.8em 0",
                "@media screen and (width <= 520px)": {
                  width: "70%",
                }
              }}
              onClick={() => openAndCloseDoctorForm('add_form')}
            >
              Add
            </MotionButton>
          </div>
        )}
      {/* Backdrop Modal for adding new card */}
      <AnimatePresence>
        {
          formOpen && (
            <BackdropModal modalHandler={() => openAndCloseDoctorForm('add_form')}>

              {/* Form */}
              <form className={styles.form} onSubmit={add_formHandler}>
                <h1>Add Doctor</h1>

                {/* Form Container having Info Container and Image Upload Container */}
                <div className={styles.formContainer}>

                  {/* Info Container having all the info */}
                  <section className={styles.infoContainer}>
                    <TextField className={styles.input} label="Name" name='name' color='primary' onChange={handleInputChange} />
                    <TextField className={styles.input} label="Experience" name='experience' color='primary' onChange={handleInputChange} />
                    <div className={styles.radioContainer}>
                      <FormLabel>Gender</FormLabel>
                      <RadioGroup row name='gender' onChange={handleInputChange} sx={{ '@media (max-width: 520px)': { flexDirection: 'column' } }}>
                        <FormControlLabel label="Male" value='male' control={<Radio />} />
                        <FormControlLabel label="Female" value='female' control={<Radio />} />
                      </RadioGroup>
                    </div>
                    <TextField className={styles.input} label="Specialization" name='specialization' color='primary' onChange={handleInputChange} />
                    <TextField className={styles.input} label="Location" name='location' color='primary' onChange={handleInputChange} />
                  </section>

                  {/* Image Upload */}
                  <section className={styles.imageUpload}>
                    <div className={styles.imageUploadContainer}>
                      <label htmlFor='image' className={styles.imageUploadLabel}>
                        <GrDocumentUpdate style={{ width: '100%', height: '100%' }} />
                        <span>Upload Image</span>
                      </label>
                      <input
                        id='image'
                        type='file'
                        name='image'
                        onChange={handleInputChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </section>
                </div>

                {/* Submit Button */}
                <MotionButton
                  whileHover={{ scale: 1.08 }}
                  sx={{
                    margin: '1.2em 0',
                  }}
                  variant='outlined'
                  type='submit'>
                  Submit
                </MotionButton>
              </form>

            </BackdropModal>
          )
        }
      </AnimatePresence>


      {/* Alert Message for Error */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertOpen}
        autoHideDuration={2000}
        onClose={() => dispatch(Alert_Close())}
      >
        <Alert
          severity="error"
          variant="filled"
        >
          {alertMessage}
        </Alert>
      </Snackbar>


      {/* Delete Backdrop opened on click of Delete Button */}
      <Dialog
        open={deleteAlert}
      >

        <DialogTitle sx={{
          fontSize: '2rem',
          fontWeight: 'bolder',
          '@media screen and (width <= 380px)': {
            fontSize: '1.5rem'
          }
        }}>
          Are You Sure ?
        </DialogTitle>

        <DialogContent sx={{
          display: 'flex',
          justifyContent: 'space-evenly'
        }}>
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              doctor_Data.splice(deleteIndex, 1);
              dispatch(Delete_Alert_Close())
            }}>
            Yes
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={() => dispatch(Delete_Alert_Close())}>
            No
          </Button>
        </DialogContent>

      </Dialog>


      {/* Edit Backdrop form opened on click of Edit Button */}
      {
        editFormOpen && (
          <BackdropModal modalHandler={() => openAndCloseDoctorForm('edit_form')}>

            {/* Form */}
            <form className={styles.form} onSubmit={edit_formHandler}>
              <h1>Edit Doctor</h1>

              {/* Form Container having Info Container and Image Upload Container */}
              <div className={styles.formContainer}>

                {/* Info Container having all the info */}
                <section className={styles.infoContainer}>
                  <TextField className={styles.input} label="Name" name='name' color='primary' value={formData.name} onChange={handleInputChange} />
                  <TextField className={styles.input} label="Experience" name='experience' color='primary' value={formData.experience} onChange={handleInputChange} />
                  <div className={styles.radioContainer}>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup row name='gender' value={formData.gender} onChange={handleInputChange} sx={{ '@media (max-width: 520px)': { flexDirection: 'column' } }}>
                      <FormControlLabel label="Male" value='male' control={<Radio />} />
                      <FormControlLabel label="Female" value='female' control={<Radio />} />
                    </RadioGroup>
                  </div>
                  <TextField className={styles.input} label="Specialization" name='specialization' color='primary' value={formData.specialization} onChange={handleInputChange} />
                  <TextField className={styles.input} label="Location" name='location' color='primary' value={formData.location} onChange={handleInputChange} />
                </section>

                {/* Image Upload */}
                <section className={styles.imageUpload}>
                  <div className={styles.imageUploadContainer}>
                    <label htmlFor='image' className={styles.imageUploadLabel}>
                      <GrDocumentUpdate style={{ width: '100%', height: '100%' }} />
                      <span>Upload Image</span>
                    </label>
                    <input
                      id='image'
                      type='file'
                      name='image'
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </section>
              </div>

              {/* Submit Button */}
              <MotionButton
                whileHover={{ scale: 1.08 }}
                sx={{
                  margin: '1.2em 0',
                }}
                variant='outlined'
                type='submit'>
                Edit
              </MotionButton>
            </form>
          </BackdropModal>
        )
      }

    </>
  )
}

export default Doctors;