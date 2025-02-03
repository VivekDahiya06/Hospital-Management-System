import { configureStore } from '@reduxjs/toolkit';
import Form_Open_Slice from './Features/Form_Open_Slice';
import AlertSlice from './Features/AlertSlice';
import Delete_Slice from './Features/Delete_Slice';
import Add_Slice from './Features/Add_Slice';
import Edit_Slice from './Features/Edit_Slice';

const store = configureStore({
    reducer: {
        form_open: Form_Open_Slice.reducer,
        add: Add_Slice.reducer,
        alert: AlertSlice.reducer,
        delete: Delete_Slice.reducer,
        edit: Edit_Slice.reducer,
    },
});

export default store;