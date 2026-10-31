import type { Request, Response } from 'express';
import { BaseController } from './base.controller.js';
import { UserService, userService } from '../services/user.service.js';
import { CreateUserSchema } from '../validators/user.schema.js';

export class UserController extends BaseController {
  constructor(private readonly service: UserService = userService) {
    super();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = CreateUserSchema.parse(req.body);
      const user = await this.service.createUser(validatedData);
      this.handleSuccess(res, user, 201, 'Tạo người dùng mới thành công');
    } catch (error) {
      this.handleError(error, res, 'createUser');
    }
  }

  async getUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await this.service.getAllUsers();
      this.handleSuccess(res, users, 200, 'Lấy danh sách người dùng thành công');
    } catch (error) {
      this.handleError(error, res, 'getUsers');
    }
  }
}

export const userController = new UserController();

