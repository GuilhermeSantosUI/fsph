import { UserDTO } from '../dtos/user-dto';

export interface IUserRepository {
  findByGoogleId(googleId: string): Promise<UserDTO | null>;
  create(user: Omit<UserDTO, 'id' | 'createdAt'>): Promise<UserDTO>;
}
