import { configureStore } from '@reduxjs/toolkit';
import Form_Open_Slice from './Features/Form_Open_Slice';
import AlertSlice from './Features/AlertSlice';
import Doctors_Delete_Slice from './Features/Doctors/Delete_Slice';
import Doctors_Add_Slice from './Features/Doctors/Add_Slice';
import Doctors_Edit_Slice from './Features/Doctors/Edit_Slice';

const store = configureStore({
    reducer: {
        form_open: Form_Open_Slice.reducer,
        alert: AlertSlice.reducer,
        Doctors_delete: Doctors_Delete_Slice.reducer,
        Doctors_add: Doctors_Add_Slice.reducer,
        Doctors_edit: Doctors_Edit_Slice.reducer
    },
});

export default store;