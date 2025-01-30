import image1 from '../assets/Images/doctor_1.png';
import image2 from '../assets/Images/doctor_2.png';
import image3 from '../assets/Images/doctor_3.png';
import image4 from '../assets/Images/doctor_4.png';
import image5 from '../assets/Images/doctor_5.png'

const Breakpoints = {
    xs: '< 380px',
    sm: '< 520px',
    md: '< 768px',
    lg: '> larger'
}


const Data = [
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
    // { "name": "Alvira Chamberlain", "experience": 11, "gender": "Female","specialization": "Dermatologist","location": "0544 Bartelt Avenue","image": `${image1}` },
    { "name": "Mal O'Dyvoy", "experience": 20, "gender": "Male","specialization": "Surgeon","location": "0442 Dovetail Junction","image": `${image2}` },
    { "name": "Barrie Savile", "experience": 15, "gender": "Male","specialization": "Dentist","location": "6 Ilene Road","image": `${image3}` },
    { "name": "Glenden Jursch", "experience": 17, "gender": "Female","specialization": "Oncologist","location": "5079 Scofield Court","image": `${image4}` },
    { "name": "Ilaire Frunks", "experience": 12, "gender": "Female","specialization": "Pediatrician","location": "93014 Lerdahl Parkway","image": `${image5}` },
    // { "name": "Fianna Negal", "experience": 10, "gender": "Female","specialization": "Psychiatrist","location": "3067 Rockefeller Road","image": `` },
    // { "name": "Corette Caulkett", "experience": 13, "gender": "Female","specialization": "Ophthalmologist","location": "042 Brickson Park Junction","image": "" },
    // { "name": "Blinni Tarver", "experience": 28, "gender": "Female","specialization": "Gynecologist","location": "8 Mayer Trail","image": "" },
    // { "name": "Krista Luddy", "experience":24, "gender": "Female","specialization": "Neurologist","location": "25 Farragut Point","image": "" },
    // { "name": "Benton Springell", "experience": 22, "gender": "Male","specialization": "Cardiologist","location": "816 Browning Pass","image": "" },
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

export default Data;