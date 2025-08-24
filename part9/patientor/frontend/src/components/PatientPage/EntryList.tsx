import { Entry } from "../../types";

interface Props {
  entries: Entry[];
}

const EntryDetail = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return null;
    case "OccupationalHealthcare":
      return (
        <ul>
          {entry.diagnosisCodes?.map((d) => (
            <li key={d}>{d}</li>
          ))}
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

const EntryList = ({ entries }: Props) => {
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
          <EntryDetail entry={e} />
        </div>
      ))}
    </div>
  );
};

export default EntryList;
