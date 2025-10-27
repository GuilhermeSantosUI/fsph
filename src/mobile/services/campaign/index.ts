import api from '../api';

type MarkCampaignPayload = {
  nome_responsavel: string;
  dt_nascimento_responsavel: string;
  email_responsavel?: string;
  cpf_responsavel: string;
  telefone_responsavel?: string;
  turno?: string;
  data?: string;
  qt_doadores?: number;
  sexo_responsavel?: string;
  // any other fields
};

export async function markCampaign(payload: MarkCampaignPayload) {
  const form = new FormData();
  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined && v !== null) form.append(k, v as any);
  });

  const { data } = await api.post('/apiagendamento/campanha/marcar', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export default {
  markCampaign,
};
