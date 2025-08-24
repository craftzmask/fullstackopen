import express, { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import { NewPatientSchema } from "../../utils";
import { NewPatientEntry, Patient } from "../types";
import { id } from "zod/v4/locales/index.cjs";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getEntry(req.params.id);
  if (patient) {
    return res.json(patient);
  }

  return res.status(404).json({
    error: `Cannot find the patient id: ${id}`,
  });
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.status(201).json(addedPatient);
  }
);

export default router;
