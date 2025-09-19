import { FastifyReply, FastifyRequest } from 'fastify';
import { UserRepository } from '../../../repositories/user-repository';
import { AuthService } from '../../../services/auth-service';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

export async function googleAuthHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { token } = await (
    req.server as any
  ).googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
  const userInfoRes = await fetch(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    {
      headers: { Authorization: `Bearer ${token.access_token}` },
    }
  );

  const userInfo = (await userInfoRes.json()) as {
    id: string;
    email: string;
    name?: string;
  };

  const user = await authService.authenticate(userInfo);

  reply.send({ user });
}
