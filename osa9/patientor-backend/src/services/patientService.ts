import { randomUUID } from 'node:crypto';

import patientsData from '../../data/patients';
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';

const patients: Patient[] = patientsData;

export const getPatients = (): Patient[] => patients;

export const getNonSensitivePatients = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

export const findById = (id: string): Patient | undefined =>
  patients.find(patient => patient.id === id);

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: randomUUID(), entries: [], ...patient };
  patients.push(newPatient);
  return newPatient;
};

export const addEntry = (patient: Patient, entry: NewEntry): Entry => {
  const newEntry: Entry = { id: randomUUID(), ...entry };
  patient.entries.push(newEntry);
  return newEntry;
};
