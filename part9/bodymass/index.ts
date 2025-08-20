import express from "express";
const app = express();

import { calculateBmi, parseBmiArguments } from "./bmiCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    if (!req.query.height || !req.query.weight) {
      throw new Error("malformatted parameters");
    }

    const { height, weight } = parseBmiArguments(
      req.query.height as string,
      req.query.weight as string
    );

    res.json({ height, weight, bmi: calculateBmi(height, weight) });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).json({ error: "Unknown error" });
    }
  }
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
