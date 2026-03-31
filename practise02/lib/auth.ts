import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { admin, username } from 'better-auth/plugins'
import { connectDB } from './mongodb'
import mongoose from 'mongoose'

await connectDB()

export const auth = betterAuth({
  database: mongodbAdapter(mongoose.connection.getClient().db()),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username(), admin({ defaultRole: 'user', adminRoles: ['admin'] })],
  session: {
    expiresIn: 60 * 60 * 24 * 3,
    updateAge: 60 * 60 * 24,
  },
})
