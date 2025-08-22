import express from "express";
const app = express();

import diagnosisService from "./services/diagnosisService";

app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("ping");
});

app.get("/api/diagnoses", (_req, res) => {
  res.json(diagnosisService.getEntries());
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
