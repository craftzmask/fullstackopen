import patientsData from "../../data/patients";
import { v4 as uuidv4 } from "uuid";

import { NonSensitivePatient, NewPatientEntry, Patient } from "../types";

const patients: Patient[] = (patientsData as Patient[]).map((p) => ({
  ...p,
  entries: p.entries ?? [],
}));

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
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

const getEntry = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getEntry,
  addPatient,
};
