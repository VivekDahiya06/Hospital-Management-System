import { createSlice } from "@reduxjs/toolkit";

const Add_Slice = createSlice({
    initialState: {
        add_doctor_form_data: {
            name: '',
            experience: '',
            gender: '',
            specialization: '',
            location: '',
            image: ''
        },
        add_patient_form_data: {
            name: '',
            age: '',
            gender: '',
            address: '',
            symptoms: []
        },

    },
    name: 'add',
    reducers: {
        Reset_Details: (state, action) => {

            if (action.payload.type === 'doctors') {
                Object.keys(state.add_doctor_form_data).forEach((key) => {
                    state.add_doctor_form_data[key] = '';
                });
            }

            else {
                Object.keys(state.add_patient_form_data).forEach((key) => {
                    state.add_patient_form_data[key] = '';
                })
            }

        },
        Set_Details: (state, action) => {

            if (action.payload.type === 'doctors') {
                Object.entries(action.payload).forEach(([key, value]) => {
                    if (key in state.add_doctor_form_data) {
                        state.add_doctor_form_data[key] = value;
                    }
                });
            }

            else {
                Object.entries(action.payload).forEach(([key, value]) => {
                    if (key in state.add_patient_form_data) {
                        state.add_patient_form_data[key] = value;
                    }
                })
            }

        }
    }
});

export const { Set_Details, Reset_Details } = Add_Slice.actions;

export default Add_Slice;