import { useState } from 'react';

import { Gender, PatientFormValues } from '../types';

interface Props {
  onSubmit: (values: PatientFormValues) => void;
}

const AddPatientForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [ssn, setSsn] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [occupation, setOccupation] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.Other);

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({ name, ssn, dateOfBirth, occupation, gender });
    setName('');
    setSsn('');
    setDateOfBirth('');
    setOccupation('');
  };

  return (
    <form onSubmit={submit}>
      <h3>add a new patient</h3>
      <div>
        name
        <input value={name} onChange={({ target }) => setName(target.value)} />
      </div>
      <div>
        ssn
        <input value={ssn} onChange={({ target }) => setSsn(target.value)} />
      </div>
      <div>
        date of birth
        <input
          type="date"
          value={dateOfBirth}
          onChange={({ target }) => setDateOfBirth(target.value)}
        />
      </div>
      <div>
        occupation
        <input
          value={occupation}
          onChange={({ target }) => setOccupation(target.value)}
        />
      </div>
      <div>
        gender
        <select
          value={gender}
          onChange={({ target }) => setGender(target.value as Gender)}
        >
          {Object.values(Gender).map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default AddPatientForm;
