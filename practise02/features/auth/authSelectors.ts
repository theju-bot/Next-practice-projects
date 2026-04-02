import { RootState } from '@/store/store'

export const selectAuth = (state: RootState) => state.auth

export const selectAuthLoading = (state: RootState) => state.auth.isLoading
export const selectAuthError = (state: RootState) => state.auth.error
export const selectAuthSuccess = (state: RootState) => state.auth.successMessage
