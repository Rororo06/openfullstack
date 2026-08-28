import axios from 'axios';

const baseUrl = '/api/todos';

export const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

export const create = async text => {
  const { data } = await axios.post(baseUrl, { text });
  return data;
};

export const update = async todo => {
  const { data } = await axios.put(`${baseUrl}/${todo.id}`, todo);
  return data;
};

export const remove = async id => {
  await axios.delete(`${baseUrl}/${id}`);
};
