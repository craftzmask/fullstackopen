import express, { Request, Response } from "express";
import { calculateBmi, parseBmiArguments } from "./bmiCalculator";
import { calculateExercises } from "./calculateExercises";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
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

    return res.json({ height, weight, bmi: calculateBmi(height, weight) });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(400).json({ error: e.message });
    } else {
      return res.status(400).json({ error: "Unknown error" });
    }
  }
});

app.get("/exercises", (req: Request<{}, {}, ExerciseType>, res: Response) => {
  try {
    const { daily_exercises, target } = req.body;

    if (!Array.isArray(daily_exercises)) {
      return res.status(400).json({
        error: "daily_exercises must be an array",
      });
    }

    if (!daily_exercises.every((n) => typeof n === "number")) {
      return res.status(400).json({
        error: "daily_exercises must contain numbers",
      });
    }

    if (typeof target !== "number") {
      return res.status(400).json({
        error: "Target must be a number",
      });
    }

    if (daily_exercises.length === 0 || target < 0) {
      return res.status(400).json({
        error: "parameters missing",
      });
    }

    return res.json(calculateExercises(daily_exercises, target));
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(400).json({ error: e.message });
    } else {
      return res.status(400).json({
        error: "Unknown Error",
      });
    }
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

interface ExerciseType {
  daily_exercises: number[];
  target: number;
}
