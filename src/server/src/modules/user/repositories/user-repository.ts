import { prisma } from '../../../config/prisma';
import { UserDTO } from '../dtos/UserDTO';
import { IUserRepository } from './iuser-repository';

export class UserRepository implements IUserRepository {
  async findByGoogleId(googleId: string): Promise<UserDTO | null> {
    const user = await prisma.user.findUnique({ where: { googleId } });
    if (!user) return null;
    return {
      ...user,
      name: user.name ?? undefined,
    };
  }

  async create(user: Omit<UserDTO, 'id' | 'createdAt'>): Promise<UserDTO> {
    const created = await prisma.user.create({
      data: user,
    });
    return {
      ...created,
      name: created.name ?? undefined,
    };
  }
}
