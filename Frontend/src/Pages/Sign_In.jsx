import React, { useState } from 'react';
import styles from './styles/Sign_In.module.css'
import backgroundImage from '../assets/Images/img_1.jpg';
import { TextField, Paper, Button, Box } from '@mui/material';

const Sign_In = () => {

    //? States
    const [values, setValues] = useState({ email: "", password: "", });
    const [elevation, setElevation] = useState(window.innerWidth);

    
    //? Functions
    const Functions = {
        handleChange: (e) => {
            const { name, value } = e.target;
            setValues({ ...values, [name]: value });
        },
        handleResize: () => {
            setElevation(window.innerWidth)
        }
    }

    window.addEventListener('resize', Functions.handleResize);



    //? HTML Returned by the Sign In Component
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: 'grid',
            placeItems: "center",
            // backgroundImage: `url(${backgroundImage})`,
            // transform: 'rotate(45deg)',
            // backgroundRepeat: "repeat",
            // backgroundSize: "80px",
            // backgroundPosition: "top left",
            
        }}>
            <Paper
                className={styles.paper}
                elevation={elevation < 900 ? 0 : 5}>

                <h1 className={styles.heading}>
                    Sign In
                </h1>

                <div className={styles.imageContainer}>
                    <img
                        className={styles.image}
                        src={backgroundImage}
                        alt="image"
                    />
                </div>

                <div className={styles.formContainer}>
                    <form
                        className={styles.formStyles}
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log("Values: ", values);
                        }}>
                        <TextField className={styles.textField} name='email' type='email' label='Email' value={values.email} onChange={Functions.handleChange} sx={{ flex: "0" }} />
                        <TextField className={styles.textField} name='password' type='password' label='Password' value={values.password} onChange={Functions.handleChange} sx={{ flex: "0" }} />
                        <Button className={styles.button} variant='outlined' type='submit'>Submit</Button>
                    </form>
                </div>
            </Paper>
        </Box>
    );
};

export default Sign_In;
