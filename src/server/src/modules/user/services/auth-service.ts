import { UserDTO } from '../dtos/user-dto';
import { UserRepository } from '../repositories/user-repository';
// Use jsonwebtoken to create auth tokens for mobile app
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async authenticate(googleUser: {
    id: string;
    email: string;
    name?: string;
  }): Promise<UserDTO> {
    let user = await this.userRepository.findByGoogleId(googleUser.id);

    if (!user) {
      user = await this.userRepository.create({
        googleId: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
      });
    }

    return user;
  }

  generateToken(user: UserDTO) {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    // minimal payload; you can extend with roles or other claims
    const payload = { sub: user.id, email: user.email };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token = (jwt as any).sign(payload, secret, { expiresIn: '7d' });
    return token as string;
  }
}
