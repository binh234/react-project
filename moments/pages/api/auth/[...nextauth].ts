import { client } from '@/utils/client'
import { findUserWithEmailQuery } from '@/utils/queries'
import NextAuth, { AuthOptions } from 'next-auth'
import { Provider } from 'next-auth/providers'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { v4 } from 'uuid'

interface CustomAuthOptions {
  providers: Provider[]
  callbacks: {
    signIn?: (params: { account: { provider: string }; profile: any }) => Promise<boolean>
    jwt?: (params: { token: any; account: any }) => Promise<any>
    session?: (params: { session: any; token: any; user: any }) => Promise<any>
  }
}

export const authOptions: CustomAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account && account.provider === 'google') {
        return profile.email_verified
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        // Check if user exist in database
        const email = token.email
        const query = findUserWithEmailQuery(email!)
        let user = await client.fetch(query)
        if (!user) {
          // Create new user
          user = {
            _id: token.sub || v4(),
            _type: 'user',
            userName: token.name,
            image: token.picture,
            email: token.email,
          }
          token._id = user._id
          client.createOrReplace(user)
        } else {
          token._id = user._id
          token.name = user.userName
        }
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user._id = token._id
      return session
    },
  },
}
export default NextAuth(authOptions as AuthOptions)
