import { getServerSession, type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
import { compare, hash } from 'bcrypt'
import { z } from 'zod';
import { User } from "@prisma/client";

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
        password: { type: 'password', placeholder: 'Pa$$w0rd' },
      },
      async authorize(credentials) {

        const { username, password } = loginUserSchema.parse(credentials);
        const user = await prisma.user.findFirst({
          where: { username },
          select:{id:true,name:true,email:true,password:true}
        });
        if (!user) return null;

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) return null;

        return { id: String(user.id), name: user.name, email: user.email };
      },
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: '/',
    signOut: '/login',
    error: '/error', // Error code passed in query string as ?error=
    verifyRequest: '/login', // (used for check email message)
    newUser: '/' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: PrismaAdapter(prisma),
  // cookies: {
  //   sessionToken: {
  //     name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
  //       domain: VERCEL_DEPLOYMENT
  //         ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  //         : undefined,
  //       secure: VERCEL_DEPLOYMENT,
  //     },
  //   },
  // },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    session({ session, token }) {
      const id = token.sub!

      session.user = {
        ...session.user,
        // @ts-expect-error
        id: id,
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
    };
  } | null>;
}
