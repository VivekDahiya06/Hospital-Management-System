import image1 from '../assets/Images/doctors/doctor_1.png';
import image2 from '../assets/Images/doctors/doctor_2.png';
import image3 from '../assets/Images/doctors/doctor_3.png';
import image4 from '../assets/Images/doctors/doctor_4.png';
import image5 from '../assets/Images/doctors/doctor_5.png';
import image6 from '../assets/Images/doctors/doctor_6.png';
import image7 from '../assets/Images/doctors/doctor_7.png';
import image8 from '../assets/Images/doctors/doctor_8.png';
import image9 from '../assets/Images/doctors/doctor_9.png';
import image10 from '../assets/Images/doctors/doctor_10.png';
import image11 from '../assets/Images/doctors/doctor_11.png';

const Breakpoints = {
    xs: '< 380px',
    sm: '< 520px',
    md: '< 768px',
    lg: '> larger'
}


const Patients_Data = [
    {
        "name": "Brennan Ramirez",
        "age": 77,
        "gender": "male",
        "address": "420-1839 Senectus St.",
        "symptoms": ["Cough", "Fever", "Running Nose", "Headache", "Vomiting"]
    },
    {
        "name": "Iola Barr",
        "age": 70,
        "gender": "female",
        "address": "Ap #735-4654 Ac, Street",
        "symptoms": ["Nose Bleed", "Headache", "Vomiting", "Diarrhea"]
    },
    {
        "name": "Quentin Coffey",
        "age": 20,
        "gender": "male",
        "address": "Ap #478-2609 Orci, Rd.",
        "symptoms": ["Vomiting", "Diarrhea", "Muscle Pain", "Paralysis"]
    },
    {
        "name": "Kasimir Hatfield",
        "age": 25,
        "gender": "male",
        "address": "862-2558 Tellus Road",
        "symptoms": ["Cough", "Sore Throat", "Shortness of Breath", "Fever"]
    },
    {
        "name": "Chandler Holt",
        "age": 30,
        "gender": "female",
        "address": "114-1866 Leo. Road",
        "symptoms": ["Fever", "Sore Throat", "Headache", "Nausea", "Vomiting"]
    }
]


export const Doctors_Data = [
    { "name": "Alvira Chamberlain", "experience": 11, "gender": "female","specialization": "Dermatologist","location": "0544 Bartelt Avenue","image": `${image1}` },
    { "name": "Mal O'Dyvoy", "experience": 20, "gender": "male","specialization": "Surgeon","location": "0442 Dovetail Junction","image": `${image2}` },
    { "name": "Barrie Savile", "experience": 15, "gender": "male","specialization": "Dentist","location": "6 Ilene Road","image": `${image3}` },
    { "name": "Glenden Jursch", "experience": 17, "gender": "female","specialization": "Oncologist","location": "5079 Scofield Court","image": `${image4}` },
    { "name": "Ilaire Frunks", "experience": 12, "gender": "female","specialization": "Pediatrician","location": "93014 Lerdahl Parkway","image": `${image5}` },
    { "name": "Fianna Negal", "experience": 10, "gender": "female","specialization": "Psychiatrist","location": "3067 Rockefeller Road","image": `${image6}` },
    { "name": "Corette Caulkett", "experience": 13, "gender": "female","specialization": "Ophthalmologist","location": "042 Brickson Park Junction","image": `${image7}` },
    { "name": "Blinni Tarver", "experience": 28, "gender": "female","specialization": "Gynecologist","location": "8 Mayer Trail","image": `${image8}` },
    { "name": "Krista Luddy", "experience":24, "gender": "female","specialization": "Neurologist","location": "25 Farragut Point","image": `${image9}` },
    { "name": "Benton Springell", "experience": 22, "gender": "male","specialization": "Cardiologist","location": "816 Browning Pass","image": `${image10}` },
];

export const symptomsOptions = [
    'Fever',
    'Cough',
    'Headache',
    'Running Nose',
    'Nose Bleed',
    'Vomiting',
    'Sore Throat',
    'Diarrhea',
    'Fatigue',
    'Muscle Pain',
    'Loss of Taste',
    'Loss of Smell',
    'Sneezing',
    'Nasal Congestion',
    'Chest Pain',
    'Shortness of Breath',
    'Loss of Appetite',
  ]

export default Patients_Data;