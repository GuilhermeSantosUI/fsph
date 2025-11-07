import { AppointmentType } from '@modules/gateway/dtos/fpsh-gateway-dto';
import { AxiosFpshGateway } from '@modules/gateway/services/axios-fpsh-service';
import { FastifyReply, FastifyRequest } from 'fastify';

const gateway = new AxiosFpshGateway();

export async function getAvailableCitiesHandler(
  request: FastifyRequest<{ Params: { type: AppointmentType } }>,
  reply: FastifyReply
) {
  const { type } = request.params;
  try {
    const data = await gateway.getAvailableCities(type);
    return reply.status(200).send(data);
  } catch (err) {
    request.log.error(err);
    return reply
      .status(500)
      .send({ error: 'Erro ao obter cidades disponíveis' });
  }
}

export async function getLocationsHandler(
  request: FastifyRequest<{
    Params: { id_cidade: string; type: AppointmentType };
  }>,
  reply: FastifyReply
) {
  const { id_cidade, type } = request.params;
  try {
    const id = BigInt(id_cidade);
    const data = await gateway.getAvailableLocations({
      id_cidade: id,
      tipo_atendimento: type,
    });
    return reply.status(200).send(data);
  } catch (err) {
    request.log.error(err);
    return reply
      .status(500)
      .send({ error: 'Erro ao obter locais disponíveis' });
  }
}

export async function healthHandler() {
  return { status: 'ok' };
}
