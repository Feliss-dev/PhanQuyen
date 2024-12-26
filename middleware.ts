import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT, // Đường dẫn mặc định khi người dùng đã đăng nhập
  apiAuthPrefix,  // Tiền tố cho các route API liên quan đến xác thực
  authRoutes, // Danh sách các route yêu cầu người dùng đã đăng nhập
  publicRoutes, // Danh sách các route công khai không yêu cầu đăng nhập
} from "@/routes";
import { UserRole } from "@prisma/client";

// Khởi tạo NextAuth với cấu hình đã được định nghĩa
const { auth } = NextAuth(authConfig);

// Middleware để kiểm tra trạng thái đăng nhập và quyền người dùng
export default auth((req) => {
  const { nextUrl } = req;  // Lấy URL hiện tại của request

  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  console.log("Auth data:", req.auth);


  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null;
  }

  if (isAdminRoute){
    if(!isLoggedIn || userRole !== UserRole.ADMIN){
      return Response.redirect(new URL('/403', nextUrl));

    }
    return null;
  }

   // Kiểm tra nếu người dùng chưa đăng nhập và không phải là route công khai
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl); // Mã hóa URL callback

     // Chuyển hướng đến trang đăng nhập với callbackUrl để quay lại trang ban đầu sau khi đăng nhập
    return Response.redirect(new URL(
      `/auth/login?callbackUrl=${encodedCallbackUrl}`,
      nextUrl
    ));
  }

  return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}