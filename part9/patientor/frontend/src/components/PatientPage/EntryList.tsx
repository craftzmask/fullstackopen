import { Diagnosis, Entry } from "../../types";

interface EntryListProps {
  entries: Entry[];
  diagnoses: Record<Diagnosis["code"], Diagnosis>;
}

interface EntryProps {
  entry: Entry;
  diagnoses: Record<Diagnosis["code"], Diagnosis>;
}

const EntryDetail = ({ entry, diagnoses }: EntryProps) => {
  console.log(diagnoses);
  switch (entry.type) {
    case "HealthCheck":
      return null;
    case "OccupationalHealthcare":
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
    case "Hospital":
      return (
        <ul>
          {entry.diagnosisCodes?.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

const EntryList = ({ entries, diagnoses }: EntryListProps) => {
  return (
    <div>
      <p>
        <strong>entries</strong>
      </p>
      {entries.map((e) => (
        <div key={e.id}>
          <p>
            {e.date} {e.description}
          </p>
          <EntryDetail entry={e} diagnoses={diagnoses} />
        </div>
      ))}
    </div>
  );
};

export default EntryList;
