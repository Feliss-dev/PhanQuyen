import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";


import { LoginSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

export default {
  providers: [
  
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  
  callbacks: {
  
 
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

   

  
      const user = await db.user.findUnique({
        where: { id: token.sub },
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      });

      if (!user) return token;

      token.name = user.name;
      token.email = user.email;
      token.role = user.role;
      token.permissions = user.permissions.map((p) => p.permission.name); // Lấy danh sách tên quyền
      
  

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole; // Thêm role vào session
        session.user.permissions = token.permissions as string[]; // Thêm permissions vào session
      }

      return session;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
} satisfies NextAuthConfig