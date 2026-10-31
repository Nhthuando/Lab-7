import type { ApiResponse, CreateUserInput, User } from '../types/user';

const API_BASE = '/api/users';

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(API_BASE);
  const data: ApiResponse<User[]> = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Không thể tải danh sách người dùng');
  }
  return data.data;
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data: ApiResponse<User> = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Có lỗi xảy ra khi tạo người dùng mới');
  }
  return data.data;
}

