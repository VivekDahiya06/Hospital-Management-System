// Import Statements
import styles from './styles/Doctor_Card.module.css';
import { Alert, Button, Dialog, DialogTitle, IconButton } from '@mui/material';
import { motion } from 'motion/react';
import { useContext, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AppContext } from '../Store/Context';
import { useDispatch, useSelector } from 'react-redux';
import { Delete_Alert_Open, Delete_Index } from '../Redux/Features/Doctors/Delete_Slice';
import { Form_Open_And_Close } from '../Redux/Features/Form_Open_Slice';
import { Set_Doctors_Details } from '../Redux/Features/Doctors/Add_Slice';

const Doctor_Card = ({ index, doctor }) => {
    
    const dispatch = useDispatch()
    
    const MotionIconButton = motion.create(IconButton);
    const MotionButton = motion.create(Button);
    

    // Function to edit the details of the doctor
    const handleEdit = () => {
        dispatch(Form_Open_And_Close('edit_form'))
        dispatch(Set_Doctors_Details(doctor));
        dispatch(Delete_Index(index))
    }
    
    // Function to delete a doctor
    const handleDelete = () => {
        dispatch(Delete_Alert_Open());
        dispatch(Delete_Index(index))
    }


    return (
        <>
            {/* Div acting as the Outer Container */}
            <motion.div
                className={styles.Container}
                initial={{
                    opacity: 0
                }}
                transition={{
                    duration: 2,
                    type: 'spring',
                }}
                whileInView={{ opacity: 1 }}
            >

                {/* .Main div acting as a container for .info and .image for proper alignment*/}
                <div className={styles.main}>

                    {/* Div having all the information of the doctor */}
                    <div className={styles.info}>
                        <p><span>Name : </span>{doctor.name}</p>
                        <p><span>Experience : </span>{doctor.experience}</p>
                        <p><span>Gender : </span>{doctor.gender}</p>
                        <p><span>Specialization : </span>{doctor.specialization}</p>
                        <p><span>Location : </span>{doctor.location}</p>
                    </div>

                    {/* Div having the doctor's image [Not visible for smaller screens] */}
                    <div className={styles.image}>
                        <img src={doctor.image} alt="image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                </div>

                {/* Buttons in case of larger screens */}
                <div className={styles.buttons}>
                    <MotionButton
                        variant='outlined'
                        endIcon={<FaEdit />}
                        whileHover={{ scale: 1.08 }}
                        onClick={handleEdit}>
                        Edit
                    </MotionButton>
                    <MotionButton
                        variant='outlined'
                        endIcon={<MdDelete />}
                        whileHover={{ scale: 1.08 }}
                        onClick={handleDelete}>
                        Delete
                    </MotionButton>
                </div>

                {/* Buttons in case of smaller screens */}
                <div className={styles.mobileButtons}>
                    <MotionIconButton
                        color='primary'
                        onClick={handleEdit}
                        sx={{ border: '2px solid #1792d2' }}
                        whileHover={{ scale: 1.08 }}>
                        <FaEdit />
                    </MotionIconButton>
                    <MotionIconButton
                        color='primary'
                        onClick={handleDelete}
                        sx={{ border: '2px solid #1792d2' }}
                        whileHover={{ scale: 1.08 }}>
                        <MdDelete />
                    </MotionIconButton>
                </div>

            </motion.div >
        </>
    )
}

export default Doctor_Card;