import api from '../api';

type MarkAppointmentPayload = {
  doador_nome: string;
  doador_dt_nascimento: string;
  doador_email?: string;
  doador_cpf: string;
  doador_telefone?: string;
  doador_sexo?: string;
  tipo: 'D' | 'M';
  id_bloco_doacao: string;
  caminho_autorizacao?: File | Blob | null | string;
};

export async function markAppointment(payload: MarkAppointmentPayload) {
  const form = new FormData();
  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined && v !== null) form.append(k, v as any);
  });

  const { data } = await api.post('/apiagendamento/agendamento/marcar', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

type EditAppointmentPayload = {
  doador_dt_nascimento: string;
  doador_cpf: string;
  tipo: 'D' | 'M';
  id_bloco_doacao: string;
  protocolo: string;
  caminho_autorizacao?: File | Blob | null | string;
};

export async function editAppointment(payload: EditAppointmentPayload) {
  const form = new FormData();
  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined && v !== null) form.append(k, v as any);
  });

  const { data } = await api.patch('/apiagendamento/agendamento/editar', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function unmarkAppointment(protocolo: string) {
  const url = `/apiagendamento/agendamento/desmarcar/${encodeURIComponent(protocolo)}`;
  const { data } = await api.delete(url);
  return data;
}

export default {
  markAppointment,
  editAppointment,
  unmarkAppointment,
};
