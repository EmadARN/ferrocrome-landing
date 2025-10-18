import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "ایمیل", type: "email" },
        password: { label: "رمز عبور", type: "password" },
        rememberMe: { label: "مرا به خاطر بسپار", type: "checkbox" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          rememberMe: Boolean(credentials.rememberMe),
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // پیشفرض ۱ ساعت
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.rememberMe = user.rememberMe;

        // مدیریت expire بر اساس rememberMe
        if (user.rememberMe) {
          token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 روز
        } else {
          token.exp = Math.floor(Date.now() / 1000) + 60 * 60; // 1 ساعت
        }
      }

      // بررسی منقضی شدن JWT در هر درخواست
      if (token.exp && Math.floor(Date.now() / 1000) > token.exp) {
        return null; // توکن منقضی شد => خروج خودکار
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        rememberMe: token.rememberMe,
      };

      // اضافه کردن زمان باقی‌مانده تا expire به session
      if (token.exp) {
        session.expiresIn = token.exp - Math.floor(Date.now() / 1000);
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
