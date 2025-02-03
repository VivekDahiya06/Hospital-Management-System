import { createSlice } from "@reduxjs/toolkit";

const Add_Slice = createSlice({
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
    name: 'add',
    reducers: {
        Reset_Details: (state) => {
            Object.keys(state.add_form_data).forEach((key) => {
                state.add_form_data[key] = '';
            });
        },
        Set_Details: (state, action) => {
            Object.entries(action.payload).forEach(([key, value]) => {
                if (key in state.add_form_data) {
                    state.add_form_data[key] = value;
                }
            });
        }
    }
});

export const { Set_Details, Reset_Details } = Add_Slice.actions;

export default Add_Slice;