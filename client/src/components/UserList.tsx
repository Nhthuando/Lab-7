import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, AlertCircle, RefreshCw, Clock, Shield } from 'lucide-react';
import { fetchUsers } from '../api/userApi';
import type { UserRole } from '../types/user';

const roleBadges: Record<UserRole, { label: string; className: string }> = {
  ADMIN: {
    label: 'Admin',
    className: 'bg-purple-50 text-purple-700 border-purple-200/80',
  },
  MODERATOR: {
    label: 'Moderator',
    className: 'bg-blue-50 text-blue-700 border-blue-200/80',
  },
  USER: {
    label: 'User',
    className: 'bg-slate-100 text-slate-700 border-slate-200',
  },
};

export const UserList: React.FC = () => {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Danh sách người dùng
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {users.length}
            </span>
          </h2>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition"
          title="Làm mới danh sách"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin text-indigo-600' : ''}`} />
        </button>
      </div>

      <div className="mt-5">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="p-4 rounded-xl border border-slate-100 animate-pulse bg-slate-50/70 flex items-center justify-between"
              >
                <div className="space-y-2">
                  <div className="h-4 w-36 bg-slate-200 rounded"></div>
                  <div className="h-3 w-48 bg-slate-200 rounded"></div>
                </div>
                <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 text-center">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-rose-800">
              Chưa thể kết nối tới cơ sở dữ liệu
            </p>
            <p className="text-xs text-rose-600 mt-1 max-w-md mx-auto">
              {(error as Error)?.message || 'Vui lòng kiểm tra biến DATABASE_URL trong file .env server.'}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-3 px-3 py-1.5 text-xs font-medium text-rose-700 bg-white border border-rose-200 rounded-lg hover:bg-rose-50 transition"
            >
              Thử lại
            </button>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">Chưa có người dùng nào</p>
            <p className="text-xs text-slate-400 mt-1">
              Điền form bên cạnh để thêm người dùng đầu tiên vào hệ thống.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {users.map((user) => {
              const badge = roleBadges[user.role] || roleBadges.USER;
              const formattedDate = new Date(user.createdAt).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={user.id}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group hover:bg-slate-50/60 rounded-xl px-2.5 -mx-2.5 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-800 truncate">
                          {user.name}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge.className}`}
                        >
                          <Shield className="w-3 h-3" />
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formattedDate}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

