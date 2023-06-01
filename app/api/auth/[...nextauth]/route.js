import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
import { UserModel } from '@models'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRECT
    })
  ],
  callbacks: {
    async session ({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await UserModel.findOne({
        email: session.user.email
      })

      session.user.id = sessionUser._id.toString()
      return session
    },
    async signIn ({ account, profile, user, credentials }) {
      try {
        await connectToDB()

        // check if user already exists
        const userExist = await UserModel.findOne({ email: profile.email })
        if (!userExist) {
          UserModel.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture
          })
        }

        return true
      } catch (error) {
        console.log('Error checking if user exists: ', error.message)
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }
