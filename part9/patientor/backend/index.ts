import express from "express";
const app = express();

import diagnosisRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("ping");
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
