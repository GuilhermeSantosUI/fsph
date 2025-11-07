import { fsphApi } from '../';

export async function getStock() {
  const { data } = await fsphApi.get('/apiinterface/estoque');
  return data;
}

export const stockService = {
  getStock,
};
