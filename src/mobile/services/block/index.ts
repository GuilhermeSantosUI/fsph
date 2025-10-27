import api from '../api';

export async function getCities(
  perm_individual: string,
  perm_medula: string,
  perm_campanha: string
) {
  const url = `/apiagendamento/cidades/${encodeURIComponent(perm_individual)}/${encodeURIComponent(perm_medula)}/${encodeURIComponent(perm_campanha)}`;
  const { data } = await api.get(url);
  return data;
}

export async function getLocations(
  id_cidade: string,
  perm_individual: string,
  perm_medula: string,
  perm_campanha: string
) {
  const url = `/apiagendamento/local/${encodeURIComponent(id_cidade)}/${encodeURIComponent(perm_individual)}/${encodeURIComponent(perm_medula)}/${encodeURIComponent(perm_campanha)}`;
  const { data } = await api.get(url);
  return data;
}

export async function listAllDates(
  id_local: string,
  perm_individual: string,
  perm_medula: string,
  perm_campanha: string
) {
  const url = `/apiagendamento/blocoagendamento/listarAllDate/${encodeURIComponent(id_local)}/${encodeURIComponent(perm_individual)}/${encodeURIComponent(perm_medula)}/${encodeURIComponent(perm_campanha)}`;
  const { data } = await api.get(url);
  return data;
}

export async function listByDate(
  dateSelected: string,
  id_local: string,
  perm_individual: string,
  perm_medula: string,
  perm_campanha: string
) {
  const url = `/apiagendamento/blocoagendamento/listarByDate/${encodeURIComponent(dateSelected)}/${encodeURIComponent(id_local)}/${encodeURIComponent(perm_individual)}/${encodeURIComponent(perm_medula)}/${encodeURIComponent(perm_campanha)}`;
  const { data } = await api.get(url);
  return data;
}

export default {
  getCities,
  getLocations,
  listAllDates,
  listByDate,
};
