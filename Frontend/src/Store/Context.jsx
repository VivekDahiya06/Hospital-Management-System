import { createContext, useState } from "react";
import Patient_Data, { Doctors_Data, symptomsOptions } from "./Data";
import { initialState } from "./Reducers";

export const AppContext = createContext();

const Context = ({ children }) => {
    const DoctorDataState = useState([]);
    const PatientDataState = useState([]);
    const DoctorFormState = useState(initialState.Doctors_Initial_State);
    const PatientFormState = useState(initialState.Patients);
    const FormState = useState(initialState.Form);
    const AlertState = useState(initialState.Alert);
    const AlertMessageState = useState(initialState.AlertMessage);
    const DeleteAlertState = useState(initialState.DeleteAlert);
    const EditFormOpenState = useState(initialState.EditFormOpen);

    const GlobalData = {
        Patient_Data,
        Doctors_Data,
        DoctorDataState,
        PatientDataState,
        symptomsOptions,
        DoctorFormState,
        PatientFormState,
        FormState,
        AlertState,
        AlertMessageState,
        DeleteAlertState,
        EditFormOpenState,
        initialState
    }


    return (
        <AppContext.Provider value={{ GlobalData }}>
            {children}
        </AppContext.Provider>
    )
}

export default Context;