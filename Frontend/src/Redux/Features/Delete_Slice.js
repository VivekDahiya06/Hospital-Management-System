import { createSlice } from "@reduxjs/toolkit";

const Delete_Slice = createSlice({
    initialState: {
        alert_open: false,
        index: null
    },
    name: 'delete',
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

export const { Delete_Alert_Open, Delete_Alert_Close, Delete_Index } = Delete_Slice.actions;

export default Delete_Slice;