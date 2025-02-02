import { createSlice } from '@reduxjs/toolkit';

const Form_Open_Slice = createSlice({
    initialState: {
        add_open: false,
        edit_open: false
    },
    name: 'form_open',
    reducers: {
        Form_Open_And_Close: (state, action) => {
            if (action.payload === 'add_form') {
                state.add_open = !(state.add_open);
            }
            else {
                state.edit_open = !(state.edit_open);
            }
        }
    },
});

export const { Form_Open_And_Close } = Form_Open_Slice.actions;
export default Form_Open_Slice;