import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z
    .string({
      required_error: 'Tên người dùng là bắt buộc',
    })
    .trim()
    .min(2, 'Tên người dùng phải có ít nhất 2 ký tự')
    .max(100, 'Tên người dùng không được vượt quá 100 ký tự'),
  email: z
    .string({
      required_error: 'Email là bắt buộc',
    })
    .trim()
    .toLowerCase()
    .email('Địa chỉ email không hợp lệ'),
  role: z.enum(['USER', 'ADMIN', 'MODERATOR']).default('USER').optional(),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

