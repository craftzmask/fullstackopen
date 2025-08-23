import * as z from "zod";
import { Gender } from "./src/types";

export const NewPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string().min(1),
});
