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
    <>
      <div className={styles.heading}>
        <h1>Welcome to the Health & Wealth HMS</h1>
      </div>

      <div className={styles.homeContainer}>
        {pages.map((element, index) => (
          <motion.div
            key={index}
            className={styles.card}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.31 },
            }}
            onClick={() => navigate(element.Link)}
          >
            <h1 className={styles.h4}>{element.name}</h1>
          </motion.div>
        ))}
      </div>
    </>

  );
};

export default Home;