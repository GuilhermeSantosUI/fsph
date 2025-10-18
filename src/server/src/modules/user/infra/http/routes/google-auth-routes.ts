import fastifyOauth2 from '@fastify/oauth2';
import { FastifyInstance } from 'fastify';
import { googleAuthHandler } from '../controllers/user-controller';

export async function googleAuthRoutes(app: FastifyInstance) {
  app.register(fastifyOauth2, {
    name: 'googleOAuth2',
    scope: ['profile', 'email'],
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID!,
        secret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/login/google',
    callbackUri: 'http://localhost:3000/login/google/callback',
  });

  app.get(
    '/login/google/callback',
    googleAuthHandler
  );
}
