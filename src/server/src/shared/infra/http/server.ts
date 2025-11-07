import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import dotenv from 'dotenv';
import { fastify } from 'fastify';
import { registerRoutes } from './routes';
dotenv.config();

const app = fastify();

app.register(fastifyCors, { origin: '*' });

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

app.get('/', async () => {
  return { message: 'Google oAuth SSR Demo!' };
});

async function start() {
  await registerRoutes(app);

  try {
    const address = await app.listen({ port: 3000, host: '127.0.0.1' });
    console.log(`Server listening at ${address}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
