import { createSlice } from "@reduxjs/toolkit";

const AlertSlice = createSlice({
    initialState: {
        open: false,
        message: ''
    },
    name: 'alert',
    reducers: {
        Alert_Open: (state, action) => {
            state.open = true;
            state.message = action.payload;
        },
        Alert_Close: (state) => {
            state.open = false;
            state.message = '';
        }
    }
});

export const { Alert_Open, Alert_Close } = AlertSlice.actions;

export default AlertSlice;