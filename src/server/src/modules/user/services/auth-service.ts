import { UserDTO } from '../dtos/UserDTO';
import { UserRepository } from '../repositories/user-repository';

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
}
