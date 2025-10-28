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

export type Appointment = {
  protocolo: string;
  data_hora: string; // ISO or display
  local: string;
  id_bloco_doacao: string;
  doador_cpf?: string;
  doador_dt_nascimento?: string;
  tipo?: 'D' | 'M';
};

export async function getAppointments(): Promise<Appointment[]> {
  try {
    // tentativa de endpoint real — ajuste conforme API disponível
    const { data } = await api.get('/apiagendamento/agendamento/listar');
    // espera-se que data seja array de agendamentos — adapte conforme retorno
    return data as Appointment[];
  } catch {
    // fallback: mock data local para desenvolvimento
    return [
      {
        protocolo: 'ABC123456',
        data_hora: '2025-11-07T10:30:00',
        local: 'E.M.E.F. José Conrado de Araújo - Rua Senador Rollemberg, 396',
        id_bloco_doacao: 'block-1',
        doador_cpf: '123.456.789-00',
        doador_dt_nascimento: '1990-01-01',
        tipo: 'D',
      },
      {
        protocolo: 'XYZ987654',
        data_hora: '2025-12-15T14:00:00',
        local: 'Unidade Básica de Saúde - Av. Principal, 100',
        id_bloco_doacao: 'block-2',
        doador_cpf: '987.654.321-00',
        doador_dt_nascimento: '1985-06-20',
        tipo: 'M',
      },
    ];
  }
}

export default {
  markAppointment,
  editAppointment,
  unmarkAppointment,
  getAppointments,
};
