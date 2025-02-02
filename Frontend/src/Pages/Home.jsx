import React from 'react';
import styles from './styles/Home.module.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const Home = () => {

  const navigate = useNavigate();

  const pages = [
    { name: "Appointments", Link: "appointments" },
    { name: "Doctors", Link: "doctors" },
    { name: "Patients", Link: "patients" },
  ];
  
  return (
    <div className={styles.homeContainer}>
      {pages.map((element, index) => (
        <motion.div
          key={index}
          className={styles.card}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
          onClick={() => navigate(element.Link)}
        >
          <h1 className={styles.h4}>{element.name}</h1>
        </motion.div>
      ))}
    </div>
  );
};

export default Home;