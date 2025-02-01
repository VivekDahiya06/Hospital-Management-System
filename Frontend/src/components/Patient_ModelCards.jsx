import styles from './styles/Patient_ModelCards.module.css';
import { Button, IconButton } from '@mui/material';
import { motion } from 'motion/react';
import { useContext } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AppContext } from '../Store/Context';


const Patient_ModelCards = ({ patient, index, setDeleteIndex }) => {

    const {GlobalData:{DeleteAlertState}} = useContext(AppContext);

    const MotionButton = motion.create(Button);

    const [deleteAlert, setDeleteAlert] = DeleteAlertState;

    const handleEdit = () => {
        console.log("Edit");
    }
    const handleDelete = () => {
        setDeleteAlert(true);
        setDeleteIndex(index);
    }

    return (
        <>
            <div className={styles.card}>
                <h4>{patient.name}</h4>
                <div className={styles.main}>
                    <div className={styles.info}>
                        <p><span>Age : </span>{patient.age}</p>
                        <p><span>Gender : </span>{patient.gender}</p>
                        <p><span>Address : </span>{patient.address}</p>
                        <article>
                            <span>Symptoms :</span>
                            <ul>
                                {
                                    patient.symptoms.map((symptom, index) => {
                                        return (
                                            <li key={1 + index}>{symptom}</li>
                                        )
                                    })
                                }
                            </ul>
                        </article>
                    </div>
                    <div className={styles.animation}>
                        <img src="https://i.pinimg.com/originals/46/0e/98/460e98e2440ec051acfd00ab9b8c9d66.gif" alt="image" />
                    </div>
                </div>

                {/* Buttons in case of larger screens */}
                <div className={styles.buttons}>
                    <MotionButton whileHover={{ scale: 1.08, }} variant='outlined' endIcon={<FaEdit />} onClick={handleEdit}>
                        Edit
                    </MotionButton>
                    <MotionButton whileHover={{ scale: 1.08, }} variant='outlined' endIcon={<MdDelete />} onClick={handleDelete}>
                        Delete
                    </MotionButton>
                </div>

                {/* Buttons in case Mobile Screens */}
                <div className={styles.mobileButtons}>
                    <IconButton size='medium' color='primary'
                        sx={{ border: '2px solid #1792d2' }}
                        onClick={handleEdit}>
                        <FaEdit />
                    </IconButton>
                    <IconButton
                        size='medium'
                        color='primary'
                        sx={{
                            border: '2px solid #1792d2'
                        }}
                        onClick={handleDelete}>
                        <MdDelete />
                    </IconButton>
                </div>
            </div>
        </>
    )
}

export default Patient_ModelCards;