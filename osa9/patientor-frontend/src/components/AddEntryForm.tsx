import { useState } from 'react';

import { Diagnosis, EntryFormValues, HealthCheckRating } from '../types';

interface Props {
  diagnoses: Diagnosis[];
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

type EntryType = EntryFormValues['type'];

const AddEntryForm = ({ diagnoses, onSubmit, error }: Props) => {
  const [type, setType] = useState<EntryType>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const baseValues = {
    description,
    date,
    specialist,
    ...(diagnosisCodes.length > 0 ? { diagnosisCodes } : {}),
  };

  const valuesFor = (entryType: EntryType): EntryFormValues => {
    switch (entryType) {
      case 'HealthCheck':
        return { ...baseValues, type: 'HealthCheck', healthCheckRating };
      case 'OccupationalHealthcare':
        return {
          ...baseValues,
          type: 'OccupationalHealthcare',
          employerName,
          ...(sickLeaveStart && sickLeaveEnd
            ? { sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd } }
            : {}),
        };
      case 'Hospital':
        return {
          ...baseValues,
          type: 'Hospital',
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };
    }
  };

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(valuesFor(type));
  };

  return (
    <form onSubmit={submit} style={{ border: '1px dashed black', padding: 10 }}>
      <h3>new {type} entry</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        type
        <select
          value={type}
          onChange={({ target }) => setType(target.value as EntryType)}
        >
          <option value="HealthCheck">HealthCheck</option>
          <option value="OccupationalHealthcare">OccupationalHealthcare</option>
          <option value="Hospital">Hospital</option>
        </select>
      </div>
      <div>
        description
        <input
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>
      <div>
        date
        <input
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </div>
      <div>
        specialist
        <input
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
      </div>
      <div>
        diagnosis codes
        <select
          multiple
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(
              Array.from(target.selectedOptions, option => option.value)
            )
          }
        >
          {diagnoses.map(diagnosis => (
            <option key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </option>
          ))}
        </select>
      </div>

      {type === 'HealthCheck' && (
        <div>
          healthcheck rating
          <select
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(Number(target.value))}
          >
            {[0, 1, 2, 3].map(rating => (
              <option key={rating} value={rating}>
                {HealthCheckRating[rating]}
              </option>
            ))}
          </select>
        </div>
      )}

      {type === 'OccupationalHealthcare' && (
        <div>
          <div>
            employer
            <input
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
          </div>
          <div>
            sick leave
            <input
              type="date"
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <input
              type="date"
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </div>
        </div>
      )}

      {type === 'Hospital' && (
        <div>
          <div>
            discharge date
            <input
              type="date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
          </div>
          <div>
            discharge criteria
            <input
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        </div>
      )}

      <button type="submit">add</button>
    </form>
  );
};

export default AddEntryForm;
