import api from '../api';

export async function getInfo(cpf: string) {
  const url = `/apiagendamento/doador/getinfo/${encodeURIComponent(cpf)}`;
  const { data } = await api.get(url);
  return data;
}

export async function getAllAppointments(cpf: string) {
  const url = `/apiagendamento/doador/agendamentos/${encodeURIComponent(cpf)}`;
  const { data } = await api.get(url);
  return data;
}

export default {
  getInfo,
  getAllAppointments,
};
