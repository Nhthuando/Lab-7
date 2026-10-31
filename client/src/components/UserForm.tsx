import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UserPlus, Loader2, Mail, User, ShieldCheck } from 'lucide-react';
import { createUser } from '../api/userApi';
import type { CreateUserInput } from '../types/user';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Họ và tên là bắt buộc')
    .min(2, 'Họ và tên phải có tối thiểu 2 ký tự')
    .max(100, 'Tối đa 100 ký tự'),
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Định dạng email không hợp lệ'),
  role: z.enum(['USER', 'ADMIN', 'MODERATOR']),
});

type FormValues = z.infer<typeof formSchema>;

export const UserForm: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'USER',
    },
  });

  const mutation = useMutation({
    mutationFn: (values: CreateUserInput) => createUser(values),
    onSuccess: (newUser) => {
      toast.success('Thêm người dùng thành công!', {
        description: `${newUser.name} (${newUser.email}) đã được tạo.`,
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      toast.error('Không thể tạo người dùng', {
        description: error.message || 'Đã xảy ra lỗi vui lòng thử lại.',
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-indigo-600" />
          Thêm người dùng mới
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Điền thông tin bên dưới để tạo tài khoản mới.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Họ và tên <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              {...register('name')}
              disabled={mutation.isPending}
              className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 text-rose-900'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 text-slate-800'
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Email <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="user@example.com"
              {...register('email')}
              disabled={mutation.isPending}
              className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 text-rose-900'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 text-slate-800'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
          )}
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Vai trò
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <select
              {...register('role')}
              disabled={mutation.isPending}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 text-slate-800 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="USER">User (Người dùng)</option>
              <option value="ADMIN">Admin (Quản trị viên)</option>
              <option value="MODERATOR">Moderator (Điều hành)</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang xử lý...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Thêm người dùng</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

