// Import Statements
import styles from './styles/BackdropModal.module.css';
import { motion } from 'motion/react';

const BackdropModal = ({ children, modalHandler }) => {
    
    return (
        <>
            {/* Outer div acting as a backdrop background*/}
            <motion.div
                className={styles.modal}
                onClick={modalHandler}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}>

                {/* Inner div containing the main card*/}
                <motion.div
                    className={styles.Box}
                    onClick={(e) => e.stopPropagation()} // Stop event propagation
                    initial={{
                        y: '-150vh',
                        x: "-50%"
                    }}
                    animate={{
                        y: '-25%',
                        x: '-50%',
                        transition: { duration: 1, type: "spring", ease: "easeIn" },
                    }}
                    exit={{
                        y: '-150vh',
                        transition: { duration: 0.3, type: "spring", ease: "linear" },
                    }}>
                    
                    {/* Card element */}
                    {children}
                    
                </motion.div>
            </motion.div>
        </>
    )
}

export default BackdropModal;