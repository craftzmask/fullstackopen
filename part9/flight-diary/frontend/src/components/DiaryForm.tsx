import React, { useState } from "react";
import type { NewDiaryEntry } from "../types";

interface DiaryFormProps {
  onSubmit: (object: NewDiaryEntry) => void;
}

const DiaryForm = ({ onSubmit }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit({
      date,
      visibility,
      weather,
      comment,
    } as NewDiaryEntry);

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">date</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="visibility">visibility</label>
        <input
          type="text"
          id="visibility"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="weather">weather</label>
        <input
          type="text"
          id="weather"
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="comment">comment</label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button type="submit">add</button>
    </form>
  );
};

export default DiaryForm;
