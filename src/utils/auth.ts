import { getServerSession, type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
import { compare, hash } from 'bcrypt'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: 'Credential',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'test',
        },
        password: { label: 'Password', type: 'password' },
      },
      
      async authorize(credentials, req) {
        // const { username, password } = credentials as {
        //   username: string
        //   password: string
        // }

        console.log({credentials,req})
        return null
        // const { user } = await grafbase.request(GetUserByUsername, {
        //   username,
        // })

        // if (!user) {
        //   const { userCreate } = await grafbase.request(CreateUserByUsername, {
        //     username,
        //     passwordHash: await hash(password, 12),
        //   })

        //   return {
        //     id: userCreate.id,
        //     username,
        //   }
        // }

        // const isValid = await compare(password, user.passwordHash)

        // if (!isValid) {
        //   throw new Error('Wrong credentials. Try again.')
        // }

        // return user
      }
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
  // adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
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
  callbacks: {
    signIn: async ({ user, account }: any) => {
      console.log({ user, account })
      return true
      // try {
      //   // Check if the user already exists in the database
      //   const existingUser = await prisma.account.findFirst({
      //     where: { userId: user.id },
      //   });

      //   if (existingUser) {
      //     // Update user data if needed
      //     await prisma.account.update({
      //       where: { id: existingUser.id },
      //       data: {
      //         access_token: account.access_token,
      //         expires_at: account.expires_at,
      //         refresh_token: account.refresh_token,
      //         refresh_token_expires_in: account.refresh_token_expires_in,
      //         token_type: account.token_type,
      //         scope: account.scope
      //       },
      //     });


      //   }

      //   return true;
      // } catch (error) {
      //   return false;
      // }
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl
    },
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {

      const id = token.sub!
      // const user = await getUserById(id)

      session.user = {
        ...session.user,
        // @ts-expect-error
        id: id,
        // name: user?.name,
        // email: user?.email,
        // gh_username: user?.gh_username,
        // @ts-expect-error
        username: token?.user?.username || token?.user?.gh_username,
      };
      return session;
    },
  },
};

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      gh_username: string;
      email: string;
      image: string;
    };
  } | null>;
}
