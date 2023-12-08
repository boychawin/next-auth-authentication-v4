import { getServerSession, type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from 'bcrypt'
import { z } from 'zod';

const loginUserSchema = z.object({
  username: z.string().regex(/^[a-z0-9_-]{3,15}$/g, 'Invalid username'),
  password: z.string().min(5, 'Password should be minimum 5 characters'),
});


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: 'Credential',
      credentials: {
        username: { type: 'text', placeholder: 'test@test.com' },
        password: { type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {

        const { username, password } = loginUserSchema.parse(credentials);
        const user = await prisma.user.findFirst({
          where: { username },
          select: { id: true, name: true, email: true, password: true, role: true, username: true }
        });
        if (!user) return null;

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) return null;

        return { ...user,id: String(user.id), };
      },
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: '/',
    signOut: '/login',
    error: '/error',
    verifyRequest: '/login',
    newUser: '/'
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    session({ session, token }) {
      session.user = {
        ...session.user,
        // @ts-expect-error
        id: token.sub!,
        // @ts-expect-error
        role: token.user.role!,
        // @ts-expect-error
        username: token.user.username!
      };
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      role: string;
    };
  } | null>;
}
