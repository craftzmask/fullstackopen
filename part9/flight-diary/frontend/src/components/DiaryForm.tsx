import React, { useState } from "react";
import { visibilitySchema, weatherSchema, type NewDiaryEntry } from "../types";

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
        visibility
        {visibilitySchema.options.map((v) => {
          const id = `visibility-${v}`;
          return (
            <label key={v} htmlFor={id} style={{ marginRight: 12 }}>
              <input
                type="radio"
                id={id}
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
                required
              />
              {v}
            </label>
          );
        })}
      </div>

      <div>
        weather
        {weatherSchema.options.map((w) => {
          const id = `weather-${w}`;
          return (
            <label key={w} htmlFor={id} style={{ marginRight: 12 }}>
              <input
                type="radio"
                id={id}
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
                required
              />
              {w}
            </label>
          );
        })}
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
