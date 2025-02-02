import { createSlice } from "@reduxjs/toolkit";

const Doctors_Edit_Slice = createSlice({
    initialState: {
        edit_form_data: {
            name: '',
            experience: '',
            gender: '',
            specialization: '',
            location: '',
            image: ''
        }
    },
    name: 'Doctors_edit',
    reducers: {
        Edit_Doctors_Details: (state, action) => {
            Object.entries(action.payload).forEach(([key, value]) => {
                if (key in state.edit_form_data) {
                    state.edit_form_data[key] = value;
                }
            })
        },
        Reset_Edit_Doctors_Details: (state) => {
            state.edit_form_data = {
                name: '',
                experience: '',
                gender: '',
                specialization: '',
                location: '',
                image: ''
            }
        }
    }
});

export const { Edit_Doctors_Details, Reset_Edit_Doctors_Details } = Doctors_Edit_Slice.actions;

export default Doctors_Edit_Slice;
