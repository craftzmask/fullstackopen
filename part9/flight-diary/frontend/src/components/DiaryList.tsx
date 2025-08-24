import { type DiaryEntry } from "../types";

interface DiaryListProps {
  diaryEntries: DiaryEntry[];
}

const DiaryList = ({ diaryEntries }: DiaryListProps) => {
  return (
    <>
      {diaryEntries.map((d) => (
        <div key={d.id}>
          <p>
            <strong>{d.date}</strong>
          </p>
          <div>visibility: {d.visibility}</div>
          <div>weather: {d.weather}</div>
        </div>
      ))}
    </>
  );
};

export default DiaryList;
