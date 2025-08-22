import patientsData from "../data/patients";

import { NonSSNPatient } from "../types";

const getEntries = (): NonSSNPatient[] => {
  return patientsData.map(({ ssn, ...rest }) => rest);
};

export default {
  getEntries,
};
