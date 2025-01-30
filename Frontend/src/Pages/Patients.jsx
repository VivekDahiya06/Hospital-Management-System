import { useContext, useEffect, useState } from 'react';
import styles from './styles/Patients.module.css';
import Patient_Card from '../components/Patient_Card';
import Patient_ModelCards from '../components/Patient_ModelCards';
import { AppContext } from '../Store/Context';
import {
  Alert,
  Autocomplete,
  Button,
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

const Patients = () => {

  const MotionButton = motion.create(Button);
  const { GlobalData: { FormState, AlertState, AlertMessageState, PatientFormState, Patient_Data, symptomsOptions, initialState: { Patients } } } = useContext(AppContext);


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  const [formOpen, setFormOpen] = FormState;
  const [alertOpen, setAlertOpen] = AlertState;
  const [alertMessage, setAlertMessage] = AlertMessageState;
  const [formData, setFormData] = PatientFormState;



  // Update 'isMobile' state on window resize
  useEffect(() => {
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
    if (formData.name !== '' || formData.age !== '' || formData.gender !== '' || formData.address !== '' || formData.symptoms.length !== 0) {
      setFormData(Patients)
    }
    setFormOpen(!formOpen);
  }




  // Function to handle form submission
  const formHandler = (e) => {
    e.preventDefault();
    if (formData.name === '' || formData.age === '' || formData.gender === '' || formData.address === '' || formData.symptoms.length === 0) {
      setAlertOpen(true);
      setAlertMessage("Please Fill All The Fields");
      return;
    }

    else if (formData.symptoms.length < 3) {
      setAlertOpen(true);
      setAlertMessage("Please Select At Least 3 Symptoms");
      return;
    }

    console.log(formData);
    Data.push(formData);
    setAlertMessage('');
    setAlertOpen(false);
    setFormData(Patients) //Setting up to initial State
    setFormOpen(false);
  }


  if (!Array.isArray(Patient_Data)) {
    return <div>No data available</div>;
  }




  return (
    <>

      <Header />
      <div className={styles.homeContainer}>

        {/* Patient Cards */}
        {
          Patient_Data.map((patient, index) => (
            isMobile
              ? <Patient_ModelCards key={patient.id || index} patient={patient} />
              : <Patient_Card key={patient.id || index} patient={patient} />
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
          onClose={() => setAlertOpen(false)}
        >
          <Alert
            onClose={() => setAlertOpen(false)}
            severity="error"
            variant='filled'
          >
            {alertMessage}
          </Alert>
        </Snackbar>

        {/* Delete Backdrop opened on click of Delete Button */}
        {false &&
          <BackdropModal>
            <div className={styles.DeleteBackdropContainer}>
              <h1>Are You Sure !!</h1>
              <div className={styles.DeleteBackdropButtons}>
                <Button>Yes</Button>
                <Button>No</Button>
              </div>
            </div>
          </BackdropModal>
        }


        {/* Edit Backdrop form opened on click of Edit Button */}

      </div>
    </>
  );
};

export default Patients;