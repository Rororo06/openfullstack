import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Entry, EntryFormValues, Patient, PatientFormValues } from '../types';

const getAll = async (): Promise<Patient[]> => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/api/patients`);
  return data;
};

const getById = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/api/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues): Promise<Patient> => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/api/patients`,
    object
  );
  return data;
};

const createEntry = async (
  id: string,
  object: EntryFormValues
): Promise<Entry> => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/api/patients/${id}/entries`,
    object
  );
  return data;
};

export default { getAll, getById, create, createEntry };
