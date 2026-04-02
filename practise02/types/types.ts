import type { Mongoose } from 'mongoose'

export interface MongooseCache {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

export interface AuthState {
  isLoading: boolean
  error: string | null
  successMessage: string | null
}
