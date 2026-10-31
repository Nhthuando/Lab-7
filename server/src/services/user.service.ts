import { UserRepository, userRepository } from '../repositories/user.repository.js';
import type { CreateUserInput } from '../validators/user.schema.js';
import { ConflictError } from '../utils/errors.js';

export class UserService {
  constructor(private readonly userRepo: UserRepository = userRepository) {}

  async createUser(input: CreateUserInput) {
    // Check if user already exists
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new ConflictError(`Email '${input.email}' đã được sử dụng bởi người dùng khác.`);
    }

    // Persist new user
    const newUser = await this.userRepo.create(input);
    return newUser;
  }

  async getAllUsers() {
    return this.userRepo.findAll();
  }
}

export const userService = new UserService();

