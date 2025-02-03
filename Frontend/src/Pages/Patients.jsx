import { useContext, useEffect, useState } from 'react';
import styles from './styles/Patients.module.css';
import Patient_Card from '../components/Patient_Card';
import Patient_ModelCards from '../components/Patient_ModelCards';
import { AppContext } from '../Store/Context';
import No_Patients_Found from '../assets/Images/No_Patients_Found.png';
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField
} from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import BackdropModal from '../components/BackdropModal';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { Alert_Close, Alert_Open } from '../Redux/Features/AlertSlice';
import { Form_Open_And_Close } from '../Redux/Features/Form_Open_Slice';
import { Delete_Alert_Close } from '../Redux/Features/Delete_Slice';

const Patients = () => {

  const dispatch = useDispatch();
  const formOpen = useSelector((state) => state.form_open.add_open);
  const alertOpen = useSelector((state) => state.alert.open);
  const alertMessage = useSelector((state) => state.alert.message);
  const deleteAlert = useSelector((state) => state.delete.alert_open);
  const deleteIndex = useSelector((state) => state.delete.index);


  const MotionButton = motion.create(Button);
  const { GlobalData: { PatientFormState, Patient_Data, PatientDataState, symptomsOptions, initialState: { Patients } } } = useContext(AppContext);


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  const [formData, setFormData] = PatientFormState;
  const [patient_Data, setPatient_Data] = PatientDataState;



  // Update 'isMobile' state on window resize
  useEffect(() => {
    setPatient_Data([...Patient_Data]);
    const handleResize = () => setIsMobile(window.innerWidth <= 520);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  



  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value
      }
    });
  }



  // Function to add a new card
  const addCard = () => {
    if (formData.name || formData.age || formData.gender || formData.address || formData.symptoms.length) {
      setFormData(Patients)
    }
    dispatch(Form_Open_And_Close('add_form'));
  }




  // Function to handle form submission
  const formHandler = (e) => {
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
    patient_Data.push(formData);
    dispatch(Alert_Close())
    setFormData(Patients)
    dispatch(Form_Open_And_Close('add_form'));
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
              onClick={addCard}
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
              <div className={styles.add} onClick={addCard}>
                +
              </div>
            }


            {/* Mobile Add Button */}
            {
              isMobile &&
              <div className={styles.addButton} onClick={addCard}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  sx={{
                    height: '2.7em',
                    fontSize: 'inherit'
                  }}
                  onClick={addCard}
                >
                  Add
                </Button>
              </div>
            }
          </div >
        )
      }


      {/* Backdrop Modal for adding new card */}
      <AnimatePresence>
        {
          formOpen && (
            <BackdropModal modalHandler={addCard}>

              {/* Form */}
              <form className={styles.form} onSubmit={formHandler}>
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
                    setFormData({ ...formData, symptoms: newValue });
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
        open={deleteAlert}
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
            onClick={() => {
              patient_Data.splice(deleteIndex, 1);
              dispatch(Delete_Alert_Close());
            }}>
            Yes
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => { dispatch(Delete_Alert_Close()); }}>
            No
          </Button>
        </DialogContent>
      </Dialog>


      {/* Edit Backdrop form opened on click of Edit Button */}

    </>
  );
};

export default Patients;