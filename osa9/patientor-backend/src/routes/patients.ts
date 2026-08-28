import express, { Request, Response } from 'express';

import { newEntryParser, newPatientParser } from '../middleware';
import * as patientService from '../services/patientService';
import { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<Patient | { error: string }>) => {
  const patient = patientService.findById(req.params.id);

  if (!patient) {
    res.status(404).send({ error: 'patient not found' });
    return;
  }

  res.send(patient);
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    res.json(patientService.addPatient(req.body));
  }
);

router.post(
  '/:id/entries',
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Entry | { error: string }>
  ) => {
    const patient = patientService.findById(req.params.id);

    if (!patient) {
      res.status(404).send({ error: 'patient not found' });
      return;
    }

    res.json(patientService.addEntry(patient, req.body));
  }
);

export default router;
