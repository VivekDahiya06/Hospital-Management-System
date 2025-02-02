import { createSlice } from "@reduxjs/toolkit";

const Doctors_Add_Slice = createSlice({
    initialState: {
        add_form_data: {
            name: '',
            experience: '',
            gender: '',
            specialization: '',
            location: '',
            image: ''
        }
    },
    name: 'Doctors_add',
    reducers: {
        Reset_Doctors_Details: (state) => {
            Object.keys(state.add_form_data).forEach((key) => {
                state.add_form_data[key] = '';
            });
        },
        Set_Doctors_Details: (state, action) => {
            Object.entries(action.payload).forEach(([key, value]) => {
                if (key in state.add_form_data) {
                    state.add_form_data[key] = value;
                }
            });
        }
    }
});

export const { Set_Doctors_Details, Reset_Doctors_Details } = Doctors_Add_Slice.actions;

export default Doctors_Add_Slice;