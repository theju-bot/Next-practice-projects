import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '@/models/User'
import { connectDB } from './mongodb'

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  await connectDB()

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPwd = await bcrypt.hash(password, 10)
  const newUser = await User.create({ name, email, password: hashedPwd })

  const token = jwt.sign(
    { userId: newUser._id, userName: newUser.name },
    process.env.JWT_SECRET as string,
    { expiresIn: '15m', issuer: 'theju' },
  )
}
