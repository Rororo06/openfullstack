import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';

const getAll = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/api/diagnoses`);
  return data;
};

export default { getAll };
