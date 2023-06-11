import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  session: {
      strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Sign In",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "email", placeholder: "email@nextvote.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          if (!credentials?.username || !credentials?.password) {
              return null
          }

          const user: any = await prisma.$queryRaw`SELECT * from user where email = ${credentials.username}`
        if (!user[0] || !!!Number(user[0].status_pilih)) {
          // Any object returned will be saved in `user` property of the JWT
          return null
        }


        const isPasswordValid = await compare(credentials.password, user[0].password)
        if (!isPasswordValid) return null
        const {password, ...userData} = user[0]
        return userData

      }
    })
  ],
  callbacks: {
    session: ({session, token}) => {
      const {jti, iat, ...tokenValue} = token
      return {...session, ...tokenValue}
    },
    jwt: ({token, user}) => {
      const {jti, iat, ...tokenValue} = token
      return {...token, ...user}
    }
  }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}