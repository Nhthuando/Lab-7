import React from 'react';
import { Toaster } from 'sonner';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Simple Minimal Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">
            Quản lý người dùng
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Thêm mới và quản lý danh sách tài khoản trong hệ thống
          </p>
        </div>

        {/* 2-column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <UserForm />
          </div>
          <div className="lg:col-span-7">
            <UserList />
          </div>
        </div>
      </div>

      {/* Global Toast */}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default App;
