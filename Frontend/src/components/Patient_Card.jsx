// Import Statements
import { useState } from 'react';
import styles from './styles/Patient_Card.module.css';
import { Typography } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import Patient_ModelCards from './Patient_ModelCards';
import BackdropModal from './BackdropModal';
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import scope from '../assets/Images/sthethoscope.svg';
import bandage from '../assets/Images/bandage.svg';
import medic_Box from '../assets/Images/medicine-box.svg';


const Patient_Card = ({ patient }) => {
    const [open, setOpen] = useState(false);

    // Function to open and close the model
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            {/* Patient Card */}
            <motion.div className={styles.background} whileHover={{ scale: 1.08 }}>
                <div className={styles.mainCard} onClick={handleOpen}>
                    <h4>{patient.name}</h4>
                    <p>Age: {patient.age}</p>
                    <p>Gender: {patient.gender}</p>
                    <Typography color='primary' className={styles.more}>Show More <MdOutlineArrowDropDownCircle />  </Typography>
                </div>
                {/* <motion.img className={styles.icon} initial={{ x: 0, zIndex: 1 }} whileHover={{ x: -15 , zIndex: 2}} transition={{ duration: 0.3 }} src={scope}></motion.img> */}
                {/* <motion.img className={styles.icon} initial={{ y: 0 }} whileHover={{ y: -15 }} transition={{ duration: 0.3 }} src={bandage}></motion.img> */}
                {/* <motion.img className={styles.icon} initial={{ x: 0 }} whileHover={{ x: 15 }} transition={{ duration: 0.3 }} src={medic_Box}></motion.img> */}
            </motion.div>

            {/* SVG Icons Animation */}



            {/* Modal with Slide Transition */}
            <AnimatePresence>
                {open &&
                    <BackdropModal modalHandler={handleClose}>
                        <Patient_ModelCards patient={patient}/>
                    </BackdropModal>
                }
            </AnimatePresence>
        </>
    );
};

export default Patient_Card;