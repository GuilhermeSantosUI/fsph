import { FastifyInstance } from 'fastify';
import {
  getAvailableCitiesHandler,
  getLocationsHandler,
  healthHandler,
} from '../controllers/gateway-controller';

export async function gatewayRoutes(app: FastifyInstance) {
  // health
  app.get(
    '/gateway/health',
    {
      schema: {
        summary: 'Gateway health check',
        response: {
          200: {
            type: 'object',
            properties: { status: { type: 'string' } },
          },
        },
      },
    },
    healthHandler
  );

  // listar cidades disponíveis por tipo de atendimento (D, M, C)
  app.get<{ Params: { type: string } }>(
    '/gateway/cities/:type',
    {
      schema: {
        summary: 'Retorna cidades disponíveis para um tipo de atendimento',
        params: {
          type: 'object',
          properties: { type: { type: 'string' } },
          required: ['type'],
        },
        response: { 200: { type: 'object' } },
      },
    },
    async (request, reply) => {
      // delegate to controller
      return getAvailableCitiesHandler(request as any, reply);
    }
  );

  // listar locais por cidade e tipo
  app.get<{ Params: { id_cidade: string; type: string } }>(
    '/gateway/locations/:id_cidade/:type',
    {
      schema: {
        summary: 'Retorna locais de doação por cidade e tipo',
        params: {
          type: 'object',
          properties: {
            id_cidade: { type: 'string' },
            type: { type: 'string' },
          },
          required: ['id_cidade', 'type'],
        },
        response: { 200: { type: 'array' } },
      },
    },
    async (request, reply) => getLocationsHandler(request as any, reply)
  );
}
