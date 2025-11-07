import { gatewayRoutes } from '@modules/gateway/infra/http/routes/gateway-routes';
import { googleAuthRoutes } from '@modules/user/infra/http/routes/google-auth-routes';
import { FastifyInstance } from 'fastify';

export async function registerRoutes(app: FastifyInstance) {
  // Register Google OAuth routes (login & callback)
  await googleAuthRoutes(app);

  // other app routes
  await gatewayRoutes(app);
}
