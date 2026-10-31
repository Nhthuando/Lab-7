import { prisma } from '../db/prisma.js';
import type { CreateUserInput } from '../validators/user.schema.js';

export class UserRepository {
  async create(data: CreateUserInput) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role ?? 'USER',
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll(limit: number = 50) {
    return prisma.user.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const userRepository = new UserRepository();

