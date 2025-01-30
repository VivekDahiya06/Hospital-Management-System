// Import Statements
import styles from './styles/Doctor_Card.module.css';
import { Alert, Button, Dialog, DialogTitle, IconButton } from '@mui/material';
import { motion } from 'motion/react';
import { useContext } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AppContext } from '../Store/Context';
// import BackdropModal from './BackdropModal';

const Doctor_Card = ({ doctor }) => {

    // Motion Components
    const MotionIconButton = motion.create(IconButton);
    const MotionButton = motion.create(Button);

    const { GlobalData: { DoctorDataState, DeleteState, DeleteAlertState } } = useContext(AppContext);
    const [doctor_Data, setDoctor_Data] = DoctorDataState;
    const [deleteAlert, setDeleteAlert] = DeleteAlertState;
    const [Delete, setDelete] = DeleteState;


    // Functions
    const handleEdit = () => {
        console.log("Edit");
    }

    //! Make this function Asynchronous in order to delete card
    const handleDelete = async () => {
        try {
            setDeleteAlert(true);
            const promise = await new Promise((resolve, reject) => {
                console.log("Pending !!!")
                if (Delete) resolve("Card Deleted !!!")
                else reject("Deletion Canceled")
            });

            console.log(promise);
            const New_Data = doctor_Data.filter((element) => element.name !== doctor.name);
            setDoctor_Data([...New_Data]);
            setDelete(false);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setDeleteAlert(false);
        }
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

            {/* <Dialog>
                <DialogTitle>Are You Sure</DialogTitle>
                <div>
                    <Button color='warning'>Yes</Button>
                    <Button color='warning'>No</Button>
                </div>
            </Dialog> */}
        </>
    )
}

export default Doctor_Card;