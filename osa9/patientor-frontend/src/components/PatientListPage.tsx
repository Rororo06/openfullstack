import { Link } from 'react-router-dom';

import { Patient } from '../types';

interface Props {
  patients: Patient[];
}

const PatientListPage = ({ patients }: Props) => (
  <div>
    <h2>patients</h2>
    <table>
      <tbody>
        <tr>
          <th>name</th>
          <th>gender</th>
          <th>occupation</th>
        </tr>
        {patients.map(patient => (
          <tr key={patient.id}>
            <td>
              <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
            </td>
            <td>{patient.gender}</td>
            <td>{patient.occupation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PatientListPage;
