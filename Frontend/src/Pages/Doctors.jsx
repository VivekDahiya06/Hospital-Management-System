import React, { useContext, useEffect, useState } from 'react'
import styles from './styles/Doctors.module.css'
import Doctor_Card from '../components/Doctor_Card'
import { Alert, Button, Dialog, DialogContent, DialogTitle, FormControlLabel, FormLabel, Radio, RadioGroup, Snackbar, TextField } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import BackdropModal from '../components/BackdropModal'
import Header from '../components/Header'
import { GrDocumentUpdate } from "react-icons/gr";
import { AppContext } from '../Store/Context'

const Doctors = () => {

  const {
    GlobalData: {
      FormState,
      AlertState,
      AlertMessageState,
      DeleteAlertState,
      DoctorFormState,
      Doctors_Data,
      DoctorDataState,
      initialState: {
        Doctors
      }
    }
  } = useContext(AppContext);

  const MotionButton = motion.create(Button);

  const [formOpen, setFormOpen] = FormState;
  const [deleteAlert, setDeleteAlert] = DeleteAlertState;
  const [alertOpen, setAlertOpen] = AlertState;
  const [alertMessage, setAlertMessage] = AlertMessageState;
  const [formData, setFormData] = DoctorFormState;
  const [doctor_Data, setDoctor_Data] = DoctorDataState;
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    setDoctor_Data(Doctors_Data);
  }, [])




  // Function to Open or Close Doctor Form
  const openAndCloseDoctorForm = () => {

    if (formData.name !== '' || formData.experience !== '' || formData.gender !== '' || formData.location !== '' || formData.specialization !== '' || formData.image !== '') {
      setFormData(Doctors)
    }
    setFormOpen(!formOpen);

  }


  // Function to handle form submission
  const formHandler = (e) => {

    e.preventDefault();
    if (formData.name === '' || formData.experience === '' || formData.gender === '' || formData.location === '' || formData.specialization === '') {
      setAlertOpen(true);
      setAlertMessage("Please Fill All The Fields");
      return;
    }

    else if (formData.image === '') {
      setAlertOpen(true);
      setAlertMessage("Image Not Found !!");
      return;
    }

    console.log(formData);

    Doctors_Data.push(formData);
    setAlertMessage('');
    setAlertOpen(false);
    setFormData(Doctors)
    setFormOpen(false);
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

          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: reader.result,
          }));

          setAlertMessage('');
          setAlertOpen(false);
        };
        return;
      }
    }

    // Handle non-image input fields
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  return (
    <>
      
      <Header />

      <div className={styles.mainContainer}>
        <div className={styles.Container}>
          {
            doctor_Data.map((doctor, index) => (
              <Doctor_Card key={index} doctor={doctor} index={index} setDeleteIndex={setDeleteIndex} />
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
          onClick={openAndCloseDoctorForm}
        >
          Add
        </MotionButton>

        {/* Backdrop Modal for adding new card */}
        <AnimatePresence>
          {
            formOpen && (
              <BackdropModal modalHandler={openAndCloseDoctorForm}>

                {/* Form */}
                <form className={styles.form} onSubmit={formHandler}>
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
          onClose={() => setAlertOpen(false)}
        >
          <Alert
            onClose={() => setAlertOpen(false)}
            severity='error'
            variant='filled'
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
              fontWeight: 'bolder'
            }}>
              Are You Sure !!
            </DialogTitle>

            <DialogContent sx={{
              display: 'flex',
              justifyContent: 'space-evenly'
            }}>
              <Button
                variant='outlined'
                color='warning'
                onClick={() => {
                  doctor_Data.splice(deleteIndex, 1);
                  setDeleteAlert(false);
                }}>
                Yes
              </Button>
              <Button
                variant='outlined'
                color='warning'
                onClick={() => { setDeleteAlert(false) }}>
                No
              </Button>
            </DialogContent>

          </Dialog>


        {/* Edit Backdrop form opened on click of Edit Button */}


      </div>
    </>
  )
}

export default Doctors;