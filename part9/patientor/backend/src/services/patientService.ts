import patientsData from "../../data/patients";
import { v4 as uuidv4 } from "uuid";

import { NonSSNPatient, NewPatientEntry, Patient } from "../types";

const patients: Patient[] = patientsData as Patient[];

const getEntries = (): NonSSNPatient[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getEntries,
  addPatient,
};
