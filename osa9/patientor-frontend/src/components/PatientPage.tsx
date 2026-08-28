import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import diagnosisService from '../services/diagnoses';
import patientService from '../services/patients';
import { Diagnosis, EntryFormValues, Patient } from '../types';
import AddEntryForm from './AddEntryForm';
import EntryDetails from './EntryDetails';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!id) {
      return;
    }

    void patientService.getById(id).then(setPatient);
    void diagnosisService.getAll().then(setDiagnoses);
  }, [id]);

  if (!patient) {
    return <div>loading...</div>;
  }

  const nameOf = (code: string) =>
    diagnoses.find(diagnosis => diagnosis.code === code)?.name;

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(patient.id, values);
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
      setError(undefined);
    } catch (e: unknown) {
      // The backend answers with the zod issues, which are far more useful
      // than a generic "request failed" message.
      const message =
        axios.isAxiosError(e) && e.response
          ? JSON.stringify(e.response.data)
          : 'unknown error';
      setError(message);
      setTimeout(() => setError(undefined), 5000);
    }
  };

  return (
    <div>
      <h2>
        {patient.name} ({patient.gender})
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      <AddEntryForm
        diagnoses={diagnoses}
        onSubmit={values => void submitEntry(values)}
        error={error}
      />

      <h3>entries</h3>
      {patient.entries.map(entry => (
        <div key={entry.id} style={{ border: '1px solid black', margin: 5 }}>
          <div>
            {entry.date} <em>{entry.description}</em>
          </div>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>
                {code} {nameOf(code)}
              </li>
            ))}
          </ul>
          <EntryDetails entry={entry} />
          <div>diagnose by {entry.specialist}</div>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
