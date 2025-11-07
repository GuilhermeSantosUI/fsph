export type Appointment = {
  protocolo: string;
  data_hora: string;
  local: string;
  id_bloco_doacao?: string;
  doador_dt_nascimento?: string;
  doador_cpf?: string;
  tipo?: 'D' | 'M' | string;
};

// NOTE: these are minimal stubs to satisfy the mobile app build and tests.
// Replace implementations with real API calls when backend endpoints are available.

export async function getAppointments(): Promise<Appointment[]> {
  // placeholder: return empty list (the UI already has a MOCK fallback)
  return [];
}

export async function editAppointment(
  payload: Partial<Appointment> & { protocolo: string }
): Promise<void> {
  // placeholder: no-op
  return;
}

export async function unmarkAppointment(protocolo: string): Promise<void> {
  // placeholder: no-op
  return;
}
