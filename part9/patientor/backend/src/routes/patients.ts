import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getEntries());
});

router.post("/", (req, res) => {
  const newPatient = toNewPatientEntry(req.body);
  const addedPatient = patientService.addPatient(newPatient);
  res.status(201).json(addedPatient);
});

export default router;
