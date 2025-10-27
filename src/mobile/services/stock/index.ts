import api from '../api';

export async function getStock() {
  const { data } = await api.get('/apiinterface/estoque');
  return data;
}

export default {
  getStock,
};
