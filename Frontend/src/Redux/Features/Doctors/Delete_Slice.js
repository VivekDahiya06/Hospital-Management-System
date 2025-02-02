import { createSlice } from "@reduxjs/toolkit";

const Doctors_Delete_Slice = createSlice({
    initialState: {
        alert_open: false,
        index: null
    },
    name: 'Doctors_delete',
    reducers: {
        Delete_Alert_Open: (state) => {
            state.alert_open = true
        },
        Delete_Alert_Close: (state) => {
            state.alert_open = false
            state.index = null
        },
        Delete_Index: (state, action) => {
            state.index = action.payload
        }
    }
});

export const { Delete_Alert_Open, Delete_Alert_Close, Delete_Index } = Doctors_Delete_Slice.actions;

export default Doctors_Delete_Slice;