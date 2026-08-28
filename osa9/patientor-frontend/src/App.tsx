import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import AddPatientForm from './components/AddPatientForm';
import PatientListPage from './components/PatientListPage';
import PatientPage from './components/PatientPage';
import patientService from './services/patients';
import { Patient, PatientFormValues } from './types';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void patientService.getAll().then(setPatients);
  }, []);

  const addPatient = (values: PatientFormValues) => {
    void patientService
      .create(values)
      .then(patient => setPatients(current => current.concat(patient)));
  };

  return (
    <div>
      <h1>patientor</h1>
      <Link to="/">home</Link>
      <Routes>
        <Route path="/patients/:id" element={<PatientPage />} />
        <Route
          path="/"
          element={
            <div>
              <PatientListPage patients={patients} />
              <AddPatientForm onSubmit={addPatient} />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
