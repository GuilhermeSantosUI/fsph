import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import dotenv from 'dotenv';
import { fastify } from 'fastify';
import { registerRoutes } from './routes';
dotenv.config();

const app = fastify();

app.register(fastifyCors, { origin: '*' });

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Fastify API',
      version: '1.0.0',
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.get('/', async () => {
  return { message: 'Google oAuth SSR Demo!' };
});

registerRoutes(app);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
