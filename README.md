# UserHub - Add New User (Fullstack React + Express + Prisma + Neon PostgreSQL)

Dự án mẫu thực hiện chức năng **Add New User** chuẩn kiến trúc phân lớp (Layered Architecture), giao diện hiện đại với React 19 & Tailwind CSS, tích hợp Prisma ORM và sẵn sàng kết nối Neon PostgreSQL.

---

## 🏗️ Cấu Trúc Dự Án (Architecture)

```text
├── client/                     # Frontend (React 19, Vite, Tailwind CSS, TanStack Query, Zod)
│   ├── src/
│   │   ├── api/                # API client (fetchUsers, createUser)
│   │   ├── components/         # UserForm, UserList, Navbar
│   │   ├── types/              # Type definitions (User, UserRole, ApiResponse)
│   │   ├── App.tsx             # Main dashboard layout
│   │   └── main.tsx            # React root & TanStack Query Provider
│   ├── package.json
│   └── vite.config.ts          # Dev server with /api proxy to backend
│
├── server/                     # Backend (Node.js, Express, TypeScript, Prisma)
│   ├── prisma/
│   │   └── schema.prisma       # Prisma schema (PostgreSQL / Neon)
│   ├── src/
│   │   ├── config/             # Centralized configuration (unifiedConfig)
│   │   ├── controllers/        # BaseController & UserController
│   │   ├── db/                 # Prisma client instance
│   │   ├── middlewares/        # Error handler & validation middleware
│   │   ├── repositories/       # UserRepository (direct database queries)
│   │   ├── routes/             # Express routes (/api/users)
│   │   ├── services/           # UserService (business logic & duplicate check)
│   │   ├── utils/              # Custom AppError & ConflictError
│   │   ├── validators/         # Zod schemas (CreateUserSchema)
│   │   ├── app.ts              # Express application setup
│   │   └── server.ts           # HTTP server entry point
│   ├── .env.example            # Sample environment variables
│   └── package.json
```

---

## 🚀 Hướng Dẫn Cấu Hình Neon PostgreSQL

1. Đăng nhập vào [Neon Console](https://console.neon.tech) và tạo 1 Project mới (hoặc chọn project hiện có).
2. Vào phần **Dashboard** hoặc **Connection Details**, sao chép chuỗi kết nối PostgreSQL (chọn Prisma hoặc Pooled connection).
3. Trong thư mục `server/`, mở file `.env` và cập nhật thông tin:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173

   # Pooled connection string (dành cho truy vấn thông thường):
   DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

   # Direct connection string (dành cho Prisma migrate/push):
   DIRECT_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-sample.us-east-2.aws.neon.tech/neondb?sslmode=require"
   ```
4. Đẩy schema lên database Neon:
   ```bash
   cd server
   pnpm prisma db push
   # hoặc
   pnpm prisma generate
   ```

---

## 💻 Cách Khởi Chạy Dự Án

### 1. Khởi chạy Backend:
```bash
cd server
pnpm dev
```
Backend sẽ chạy tại: `http://localhost:5000` (Health check: `http://localhost:5000/api/health`)

### 2. Khởi chạy Frontend:
Mở một terminal mới:
```bash
cd client
pnpm dev
```
Frontend sẽ chạy tại: `http://localhost:5173`

---

## 💎 Điểm Nhấn Công Nghệ

- **Frontend**:
  - **React 19 + Vite 6**: Tốc độ khởi động và HMR cực nhanh.
  - **Tailwind CSS**: Thiết kế giao diện hiện đại, responsive, màu sắc hài hòa.
  - **React Hook Form + Zod**: Validate form chặt chẽ từ phía client, báo lỗi trực quan.
  - **TanStack Query (React Query v5)**: Quản lý cache server-state, tự động invalidate và refresh danh sách người dùng ngay khi tạo mới thành công.
  - **Sonner**: Toast notification đẹp mắt và mượt mà.
  - **Lucide Icons**: Bộ icon hiện đại, chuẩn SVG.

- **Backend**:
  - **Express.js + TypeScript**: Kiểu dữ liệu tĩnh an toàn, code sạch và dễ bảo trì.
  - **Layered Architecture**: Tách bạch 4 tầng rõ ràng `Routes -> Controllers -> Services -> Repositories -> Database`.
  - **Zod Validation**: Kiểm tra và sanitize request payload đầu vào trước khi vào tầng xử lý logic.
  - **Prisma ORM**: Làm việc với PostgreSQL type-safe, cấu hình sẵn sàng cho Neon serverless connection pooling.
  - **Conflict Detection**: Báo lỗi `409 Conflict` tức thì khi email đã tồn tại.

