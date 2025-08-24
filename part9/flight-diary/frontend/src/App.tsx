import { useState, useEffect } from "react";
import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryList";
import diaryService from "./services/diaries";
import type { DiaryEntry, NewDiaryEntry } from "./types";
import axios from "axios";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    diaryService.getAll().then((data) => setDiaryEntries(data));
  }, []);

  const handleSubmit = async (object: NewDiaryEntry) => {
    try {
      const data = await diaryService.create(object);
      setDiaryEntries(diaryEntries.concat(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      }
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      {<span style={{ color: "red" }}>{error}</span>}
      <DiaryForm onSubmit={handleSubmit} />

      <h2>Diary Entries</h2>
      <DiaryList diaryEntries={diaryEntries} />
    </>
  );
}

export default App;
