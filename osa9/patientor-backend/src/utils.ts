import { z } from 'zod';

import { Gender, HealthCheckRating } from './types';

export const NewPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.iso.date(),
  ssn: z.string().min(1),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1),
});

const BaseEntrySchema = z.object({
  description: z.string().min(1),
  date: z.iso.date(),
  specialist: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().min(1),
  sickLeave: z
    .object({ startDate: z.iso.date(), endDate: z.iso.date() })
    .optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({ date: z.iso.date(), criteria: z.string().min(1) }),
});

export const NewEntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);
