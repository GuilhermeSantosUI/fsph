import { UserRepository } from '@modules/user/repositories/user-repository';
import { AuthService } from '@modules/user/services/auth-service';
import { FastifyReply, FastifyRequest } from 'fastify';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

export async function googleAuthHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { error, error_description, state, code } = req.query as any;

    if (error) {
      console.error('OAuth error:', error, error_description);
      return reply.redirect(
        `mobile://auth/error?error=${encodeURIComponent(error)}`
      );
    }

    if (!code) {
      console.error('No authorization code received');
      return reply.redirect('mobile://auth/error?error=no_code');
    }

    let token: any;

    try {
      const result = await (
        req.server as any
      ).googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
      token = result.token;
      console.log('Google token received successfully');
    } catch (err: any) {
      console.error('Token exchange failed:', err.message);

      if (err.message === 'Invalid state') {
        console.error('State validation failed. Possible causes:');
        console.error('- Cookies not working properly');
        console.error('- Development vs production cookie settings');
        console.error('- Cross-domain issues');

        if (process.env.NODE_ENV === 'development') {
          console.warn('Bypassing state check for development');

          return reply.redirect(
            'mobile://auth/error?error=invalid_state_development'
          );
        }

        return reply.redirect('mobile://auth/error?error=invalid_state');
      }

      throw err; // Re-throw other errors
    }

    const userInfoRes = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }
    );

    if (!userInfoRes.ok) {
      throw new Error(`Failed to fetch user info: ${userInfoRes.statusText}`);
    }

    const userInfo = (await userInfoRes.json()) as {
      id: string;
      email: string;
      name?: string;
      picture?: string;
    };

    console.log('Google user info:', userInfo);

    const user = await authService.authenticate(userInfo);

    // generate a server-signed token for the user
    let jwtToken: string | null = null;
    try {
      jwtToken = authService.generateToken(user);
    } catch (err) {
      console.error('Failed to generate JWT:', (err as any)?.message ?? err);
    }

    const payload = encodeURIComponent(JSON.stringify(user));
    // include token as a separate query param; client will decode and store it
    const redirectTo = `mobile://auth/callback?user=${payload}${
      jwtToken ? `&token=${encodeURIComponent(jwtToken)}` : ''
    }`;

    reply.redirect(redirectTo);
  } catch (error: any) {
    console.error('Google auth handler error:', error);

    const errorMessage = encodeURIComponent(
      error.message || 'Authentication failed'
    );
    reply.redirect(`mobile://auth/error?error=${errorMessage}`);
  }
}
