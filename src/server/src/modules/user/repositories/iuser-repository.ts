import { UserDTO } from '../dtos/UserDTO';

export interface IUserRepository {
  findByGoogleId(googleId: string): Promise<UserDTO | null>;
  create(user: Omit<UserDTO, 'id' | 'createdAt'>): Promise<UserDTO>;
}
