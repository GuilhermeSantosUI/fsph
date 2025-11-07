import { gatewayRoutes } from '@modules/gateway/infra/http/routes/gateway-routes';
import { googleAuthRoutes } from '@modules/user/infra/http/routes/user-routes';
import { FastifyInstance } from 'fastify';

export async function registerRoutes(app: FastifyInstance) {
  await googleAuthRoutes(app);
  await gatewayRoutes(app);
}
