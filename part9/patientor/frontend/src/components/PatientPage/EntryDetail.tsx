import { Diagnosis, Entry } from "../../types";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Stack, Typography } from "@mui/material";
import { assertNever } from "../../utils";
import { yellow } from "@mui/material/colors";

interface EntryProps {
  entry: Entry;
  diagnoses: Record<Diagnosis["code"], Diagnosis>;
}

const EntryIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "Hospital":
      return <ApartmentIcon />;
    case "OccupationalHealthcare":
      return <WorkIcon />;
    case "HealthCheck":
      return <MedicalServicesIcon />;
  }
};

const HealthIcon = ({ rating }: { rating: number }) => {
  switch (rating) {
    case 0:
      return <FavoriteIcon sx={{ color: "success.main" }} />;
    case 1:
      return <FavoriteIcon sx={{ color: yellow[500] }} />;
    case 2:
      return <FavoriteIcon sx={{ color: "warning.main" }} />;
    case 3:
      return <FavoriteIcon sx={{ color: "error.main" }} />;
  }
};

const EntryDetail = ({ entry, diagnoses }: EntryProps) => {
  const showDiagnoses = () => {
    return (
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          const diag = diagnoses[code];
          return (
            <li key={code}>
              <strong>{code}</strong>
              {diag ? `: ${diag.name}` : ""}
            </li>
          );
        })}
      </ul>
    );
  };

  const showEntryDetail = () => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthIcon rating={entry.healthCheckRating} />;
      case "OccupationalHealthcare":
        return entry.diagnosisCodes && showDiagnoses();
      case "Hospital":
        return entry.diagnosisCodes && showDiagnoses();
      default:
        return assertNever(entry);
    }
  };

  return (
    <Stack sx={{ border: "1px solid black", p: 2, borderRadius: "8px" }}>
      <Typography>
        {entry.date} <EntryIcon type={entry.type} />
      </Typography>
      <Typography>{entry.description}</Typography>
      {showEntryDetail()}
      <Typography>diagnose by {entry.specialist}</Typography>
    </Stack>
  );
};

export default EntryDetail;
