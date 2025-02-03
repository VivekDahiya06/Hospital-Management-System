import { createSlice } from "@reduxjs/toolkit";

const Edit_Slice = createSlice({
    initialState: {
        alert_open: false,
    },
    name: 'edit',
    reducers: {
        Edit_Alert_Open: (state) => {
            state.alert_open = true;
        },
        Edit_Alert_Close: (state) => {
            state.alert_open = false;
        }
    }
});

export const { Edit_Alert_Open, Edit_Alert_Close } = Edit_Slice.actions;

export default Edit_Slice;