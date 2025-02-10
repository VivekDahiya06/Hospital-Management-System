import { useContext, useEffect, useState } from 'react';
import styles from './styles/Patients.module.css';
import Patient_Card from '../components/Patient_Card';
import Patient_ModelCards from '../components/Patient_ModelCards';
import { AppContext } from '../Store/Context';
import No_Patients_Found from '../assets/Images/No_Patients_Found.png';
import { Alert, Autocomplete, Button, Dialog, DialogContent, DialogTitle, FormControlLabel, FormLabel, Radio, RadioGroup, Snackbar, TextField } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import BackdropModal from '../components/BackdropModal';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { Alert_Close, Alert_Open } from '../Redux/Features/AlertSlice';
import { Form_Open_And_Close } from '../Redux/Features/Form_Open_Slice';
import { Delete_Alert_Close } from '../Redux/Features/Delete_Slice';
import { Reset_Details, Set_Details } from '../Redux/Features/Add_Slice';
import { Edit_Alert_Close, Edit_Alert_Open } from '../Redux/Features/Edit_Slice';
import axios from 'axios';

const Patients = () => {

  const dispatch = useDispatch();
  const formOpen = useSelector((state) => state.form_open.add_open);
  const editFormOpen = useSelector((state) => state.form_open.edit_open);
  const alertOpen = useSelector((state) => state.alert.open);
  const alertMessage = useSelector((state) => state.alert.message);
  const deleteAlert = useSelector((state) => state.delete.alert_open);
  const editAlert = useSelector((state) => state.edit.alert_open);
  const deleteIndex = useSelector((state) => state.delete.index);
  const formData = useSelector((state) => state.add.add_patient_form_data);


  const MotionButton = motion.create(Button);
  const { GlobalData: { Patient_Data, PatientDataState, symptomsOptions } } = useContext(AppContext);


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  const [patient_Data, setPatient_Data] = PatientDataState;



  // Update 'isMobile' state on window resize
  useEffect(() => {
    fetchPatientData();
    setPatient_Data([...Patient_Data]);
    const handleResize = () => setIsMobile(window.innerWidth <= 520);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 



  async function fetchPatientData() {
    try {
      const patient_Api_Request = await axios.get('http://localhost:5000/patients');
      console.log(patient_Api_Request.data);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(Set_Details({ [name]: value, type: 'patients' }));
  }



  // Function to Open & Close Patient Forms
  const openAndClosePatientForm = (type) => {
    if (formData.name || formData.age || formData.gender || formData.address || formData.symptoms.length) {
      dispatch(Reset_Details({ type: 'patients' }));
    }
    dispatch(Form_Open_And_Close(type));
  }




  // Function to handle form submission
  const update_formHandler = (e, type) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender || !formData.address || !formData.symptoms.length) {
      dispatch(Alert_Open("Please Fill All The Fields"));
      return;
    }

    else if (formData.symptoms.length < 3) {
      dispatch(Alert_Open("Please Select At Least 3 Symptoms"));
      return;
    }

    console.log(formData);
    type === 'add_form' ? patient_Data.push(formData) : patient_Data.splice(deleteIndex, 1, formData);
    dispatch(Alert_Close())
    dispatch(Reset_Details({ type: 'patients' }));
    dispatch(Form_Open_And_Close(type));
  };


  const handleAlert = (e) => {
    if (deleteAlert) {
      patient_Data.splice(deleteIndex, 1);
      dispatch(Delete_Alert_Close());
    }
    else {
      update_formHandler(e, 'edit_form');
      dispatch(Edit_Alert_Close());
    }
  }


  if (!Array.isArray(Patient_Data)) {
    return <div>No data available</div>;
  }




  return (
    <>

      <Header />
      {
        patient_Data.length === 0 ? (

          <div className={styles.NotFoundContainer}>
            <div className={styles.NotFoundImageContainer}>
              <h1>No Patients Found</h1>
              <img src={No_Patients_Found} alt='No Patients Found' style={{ width: "50%", height: "50%" }} />
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
              onClick={() => openAndClosePatientForm('add_form')}
            >
              Add
            </MotionButton>
          </div>
        ) : (
          <div className={styles.homeContainer}>

            {/* Patient Cards */}
            {
              patient_Data.map((patient, index) => (
                isMobile
                  ? <Patient_ModelCards key={patient.id || index} patient={patient} index={index} />
                  : <Patient_Card key={patient.id || index} patient={patient} index={index} />
              ))
            }

            {/* Desktop Add Button */}
            {
              !isMobile &&
              <div className={styles.add} onClick={() => openAndClosePatientForm('add_form')}>
                +
              </div>
            }


            {/* Mobile Add Button */}
            {
              isMobile &&
              <div className={styles.addButton} onClick={() => openAndClosePatientForm('add_form')}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  sx={{
                    height: '2.7em',
                    fontSize: 'inherit'
                  }}
                >
                  Add
                </Button>
              </div>
            }
          </div >
        )
      }


      {/* Backdrop Modal for add new card form */}
      <AnimatePresence>
        {
          formOpen && (
            <BackdropModal modalHandler={() => openAndClosePatientForm('add_form')}>

              {/* Form */}
              <form className={styles.form} onSubmit={(e) => update_formHandler(e, 'add_form')}>
                <h1>Add Patient</h1>
                <TextField className={styles.input} label="Name" name='name' color='primary' onChange={handleInputChange} />
                <TextField className={styles.input} label="Age" name='age' color='primary' onChange={handleInputChange} />
                <div className={styles.radioContainer}>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row name='gender' onChange={handleInputChange} sx={{ '@media (max-width: 520px)': { flexDirection: 'column' } }}>
                    <FormControlLabel label="Male" value='male' control={<Radio />} />
                    <FormControlLabel label="Female" value='female' control={<Radio />} />
                  </RadioGroup>
                </div>
                <TextField className={styles.input} label="Address" name='address' color='primary' onChange={handleInputChange} />
                <Autocomplete
                  className={styles.input}
                  multiple
                  freeSolo
                  selectOnFocus
                  name='symptoms'
                  limitTags={2}
                  options={symptomsOptions}
                  sx={{
                    '& .MuiChip-sizeMedium': {
                      backgroundColor: '#0c306f',  // Change background color of selected items
                      color: 'white',                // Change text color of selected items
                    },
                    '& .MuiChip-deleteIcon': {
                      color: '#fafafa',
                      '&:hover': {
                        color: '#8c8c8c'
                      }
                    },
                  }}
                  onChange={(e, newValue) => {
                    dispatch(Set_Details({ symptoms: newValue, type: 'patients' }));
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Symptoms" />
                    )
                  }}
                />
                <MotionButton
                  className={styles.submitButton}
                  whileHover={{ scale: 1.08 }}
                  sx={{
                    '@media (max-width: 520px)': {
                      margin: "0.8em 0",
                    },
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


      {/* Alert Message for Errors & Warnings */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertOpen}
        autoHideDuration={2000}
        onClose={() => dispatch(Alert_Close())}
      >
        <Alert
          severity="error"
          variant='filled'
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      {/* Delete Backdrop opened on click of Delete Button */}

      <Dialog
        open={deleteAlert || editAlert}
      >
        <DialogTitle
          sx={{
            fontSize: '2rem',
            fontWeight: 'bolder',
            '@media screen and (width <= 380px)': {
              fontSize: '1.5rem'
            }
          }}>
          Are You Sure ?
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly'
          }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleAlert}>
            Yes
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              deleteAlert ? dispatch(Delete_Alert_Close()) : dispatch(Edit_Alert_Close());
            }}>
            No
          </Button>
        </DialogContent>
      </Dialog>


      {/* Edit Backdrop form opened on click of Edit Button */}

      <AnimatePresence>
        {
          editFormOpen && (
            <BackdropModal modalHandler={() => openAndClosePatientForm('edit_form')}>

              {/* Form */}
              <form className={styles.form}>
                <h1>Edit Patient</h1>
                <TextField className={styles.input} label="Name" name='name' color='primary' value={formData.name} onChange={handleInputChange} />
                <TextField className={styles.input} label="Age" name='age' color='primary' value={formData.age} onChange={handleInputChange} />
                <div className={styles.radioContainer}>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row name='gender' value={formData.gender} onChange={handleInputChange} sx={{ '@media (max-width: 520px)': { flexDirection: 'column' } }}>
                    <FormControlLabel label="Male" value='male' control={<Radio />} />
                    <FormControlLabel label="Female" value='female' control={<Radio />} />
                  </RadioGroup>
                </div>
                <TextField className={styles.input} label="Address" name='address' color='primary' value={formData.address} onChange={handleInputChange} />
                <Autocomplete
                  className={styles.input}
                  multiple
                  freeSolo
                  selectOnFocus
                  name='symptoms'
                  value={formData.symptoms}
                  limitTags={2}
                  options={symptomsOptions}
                  sx={{
                    '& .MuiChip-sizeMedium': {
                      backgroundColor: '#0c306f',  // Change background color of selected items
                      color: 'white',                // Change text color of selected items
                    },
                    '& .MuiChip-deleteIcon': {
                      color: '#fafafa',
                      '&:hover': {
                        color: '#8c8c8c'
                      }
                    },
                  }}
                  onChange={(e, newValue) => {
                    dispatch(Set_Details({ symptoms: newValue, type: 'patients' }));
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Symptoms" />
                    )
                  }}
                />
                <MotionButton
                  className={styles.submitButton}
                  whileHover={{ scale: 1.08 }}
                  sx={{
                    '@media (max-width: 520px)': {
                      margin: "0.8em 0",
                    },
                  }}
                  variant='outlined'
                  type='submit'
                  onClick={() => {
                    dispatch(Edit_Alert_Open());
                  }}
                >
                  Edit
                </MotionButton>
              </form>

            </BackdropModal>
          )
        }
      </AnimatePresence>

    </>
  );
};

export default Patients;