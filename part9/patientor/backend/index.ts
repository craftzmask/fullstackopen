import express, { NextFunction, Request, Response } from "express";
const app = express();

import diagnosisRouter from "./src/routes/diagnoses";
import patientRouter from "./src/routes/patients";
import z from "zod";

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("ping");
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

app.use(errorMiddleware);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
