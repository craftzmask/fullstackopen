import { Diagnosis, Entry } from "../../types";
import { Stack, Typography } from "@mui/material";
import EntryDetail from "./EntryDetail";

interface EntryListProps {
  entries: Entry[];
  diagnoses: Record<Diagnosis["code"], Diagnosis>;
}

const EntryList = ({ entries, diagnoses }: EntryListProps) => {
  return (
    <Stack spacing={1} sx={{ py: 2 }}>
      <Typography variant="h5" sx={{ mt: 2, fontWeight: 700 }}>
        entries
      </Typography>

      {entries.length === 0 ? (
        <Typography>No Entries Available</Typography>
      ) : (
        <>
          {entries.map((e) => (
            <EntryDetail key={e.id} entry={e} diagnoses={diagnoses} />
          ))}
        </>
      )}
    </Stack>
  );
};

export default EntryList;
