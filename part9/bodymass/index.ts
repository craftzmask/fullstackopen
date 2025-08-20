import express from "express";
const app = express();

import { calculateBmi, parseBmiArguments } from "./bmiCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const { height, weight } = parseBmiArguments(
    req.query.height as string,
    req.query.weight as string
  );

  return res.json({
    height,
    weight,
    bmi: calculateBmi(height, weight),
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
