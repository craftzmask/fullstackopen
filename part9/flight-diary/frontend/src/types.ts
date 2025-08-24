import { z } from "zod";

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export const weatherSchema = z.enum([
  "sunny",
  "rainy",
  "cloudy",
  "stormy",
  "windy",
]);

export type Weather = z.infer<typeof weatherSchema>;

export const visibilitySchema = z.enum(["great", "good", "ok", "poor"]);

export type Visibility = z.infer<typeof visibilitySchema>;

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
