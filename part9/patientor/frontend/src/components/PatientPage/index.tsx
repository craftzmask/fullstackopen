import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { Typography, Stack } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import patientService from "../../services/patients";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

  useEffect(() => {
    patientService.getOne(id).then((data) => setPatient(data));
  }, [id]);

  return (
    <Stack py={4}>
      <Typography
        variant="h4"
        style={{ marginBottom: "0.5em" }}
        fontWeight={700}
      >
        {patient?.name}
        {patient?.gender === "female" ? (
          <FemaleIcon fontSize="large" />
        ) : (
          <MaleIcon fontSize="large" />
        )}
      </Typography>

      <Typography>ssn: {patient?.ssn}</Typography>

      <Typography>occupation: {patient?.occupation}</Typography>
    </Stack>
  );
};

export default PatientPage;
