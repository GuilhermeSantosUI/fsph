import fastifyOauth2 from '@fastify/oauth2';
import { FastifyInstance } from 'fastify';
import { googleAuthHandler } from '../controllers/user-controller';

export async function googleAuthRoutes(app: FastifyInstance) {
  const isProduction = process.env.NODE_ENV === 'production';
  const callbackUri = isProduction
    ? 'https://yourproductiondomain.com/login/google/callback'
    : 'http://localhost:3000/login/google/callback';

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
    callbackUri: callbackUri,
    // NOTE: modern browsers reject cookies with SameSite='None' unless Secure=true.
    // In development (localhost, no HTTPS) setting sameSite:'none' + secure:false
    // will cause the state cookie to be discarded and lead to "Invalid state".
    // Use 'lax' for local development so the state cookie is preserved.
    cookie: {
      secure: isProduction, // true in production (HTTPS), false in development
      sameSite: 'lax', // use 'lax' locally to avoid browser rejection
      path: '/',
      httpOnly: true,
    },
  });

  app.get('/login/google/callback', googleAuthHandler);
}
