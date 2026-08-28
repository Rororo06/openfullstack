import { assertNever, Entry, HealthCheckRating } from '../types';

const HealthRatingBar = ({ rating }: { rating: HealthCheckRating }) => (
  <div>health rating: {HealthCheckRating[rating]}</div>
);

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <div>
          <div>discharged {entry.discharge.date}</div>
          <div>{entry.discharge.criteria}</div>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          <div>employer: {entry.employerName}</div>
          {entry.sickLeave && (
            <div>
              sick leave {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
            </div>
          )}
        </div>
      );
    case 'HealthCheck':
      return <HealthRatingBar rating={entry.healthCheckRating} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
