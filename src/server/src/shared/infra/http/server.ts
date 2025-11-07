import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
// oauth2 is registered per-module in the dedicated google-auth routes file
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import dotenv from 'dotenv';
import { fastify } from 'fastify';
import { registerRoutes } from './routes';

dotenv.config();

const app = fastify();

// CORS
app.register(fastifyCors, { origin: '*' });

// Cookies (obrigatório para o state do OAuth)
app.register(fastifyCookie, {
  secret: 'um-segredo-bem-seguro-aqui', // qualquer string segura
});

// Swagger
app.register(
  fastifySwagger as any,
  {
    swagger: {
      info: {
        title: 'Fastify API',
        version: '1.0.0',
      },
    },
    exposeRoute: true,
  } as any
);

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

// NOTE: Google OAuth2 plugin is registered inside the module routes
// (src/modules/user/infra/http/routes/google-auth-routes.ts) to keep
// auth-related routes grouped. Do not register it here to avoid
// duplicate route errors.

// Iniciar servidor
async function start() {
  try {
    await registerRoutes(app);

    const address = await app.listen({ port: 3000, host: 'localhost' });

    console.log(`Server listening at ${address}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
