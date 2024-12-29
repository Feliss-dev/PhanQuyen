# Next Auth v5 - Advanced Guide (2024)

![image](https://github.com/AntonioErdeljac/next-auth-v5-advanced-guide/assets/23248726/d0175397-8c3f-4e82-91c4-78c14f29bb81)

This is a repository for Next Auth v5 - Advanced Guide (2024)

[VIDEO TUTORIAL](https://youtu.be/1MTyCvS05V4)

Key Features:
- 🔐 Next-auth v5 (Auth.js)
- 🚀 Next.js 14 with server actions
- 🔑 Credentials Provider
- 🌐 OAuth Provider (Social login with Google & GitHub)
- 🔒 Forgot password functionality
- ✉️ Email verification
- 📱 Two factor verification
- 👥 User roles (Admin & User)
- 🔓 Login component (Opens in redirect or modal)
- 📝 Register component
- 🤔 Forgot password component
- ✅ Verification component
- ⚠️ Error component
- 🔘 Login button
- 🚪 Logout button
- 🚧 Role Gate
- 🔍 Exploring next.js middleware
- 📈 Extending & Exploring next-auth session
- 🔄 Exploring next-auth callbacks
- 👤 useCurrentUser hook
- 🛂 useRole hook
- 🧑 currentUser utility
- 👮 currentRole utility
- 🖥️ Example with server component
- 💻 Example with client component
- 👑 Render content for admins using RoleGate component
- 🛡️ Protect API Routes for admins only
- 🔐 Protect Server Actions for admins only
- 📧 Change email with new verification in Settings page
- 🔑 Change password with old password confirmation in Settings page
- 🔔 Enable/disable two-factor auth in Settings page
- 🔄 Change user role in Settings page (for development purposes only)

### Prerequisites

**Node version 18.7.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next-auth-v5-advanced-guide.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=

NEXT_PUBLIC_APP_URL=
```

### Setup Prisma
```shell
npx prisma generate / npx prisma migrate dev
npx prisma db push
```

### Start the app

```shell
npm run dev
```
Clone code về +  set up môi trường + npm installinstall

Cách để tạo tài khoản mẫu chạy chương trình
Sau khi đã cài đặt thành công db việc tiếp theo cần làm seed user

Copy đoạn code này vào cuối file package.json

,
  "prisma": {
    "seed": "node --loader ts-node/esm ./prisma/seed.ts"
  },
  "type": "module"

Copy đầy đủ cả dấu ','

Chạy npx prisma db seed để thêm tài khoản vào để đăng nhập

Sau khi thêm dữ liệu thành công xóa đoạn code vừa rồi trong package.json đi để tiếp tục run chương trìnhtrình


## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
