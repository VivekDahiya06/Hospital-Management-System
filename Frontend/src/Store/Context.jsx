import { createContext, useState } from "react";
import Patient_Data, { Doctors_Data, symptomsOptions } from "./Data";
import { initialState } from "./Reducers";

export const AppContext = createContext();

const Context = ({ children }) => {
    const DoctorDataState = useState([]);
    const PatientDataState = useState([]);
    const DoctorFormState = useState(initialState.Doctors);
    const PatientFormState = useState(initialState.Patients);
    const FormState = useState(initialState.Form);
    const AlertState = useState(initialState.Alert);
    const AlertMessageState = useState(initialState.AlertMessage);
    const AlertTypeState = useState(initialState.AlertType);
    const DeleteAlertState = useState(initialState.DeleteAlert);

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
        AlertTypeState,
        DeleteAlertState,
        initialState
    }


    return (
        <AppContext.Provider value={{ GlobalData }}>
            {children}
        </AppContext.Provider>
    )
}

export default Context;