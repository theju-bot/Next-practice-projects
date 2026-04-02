import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

import {
  setAuthLoading,
  setAuthError,
  setAuthSuccess,
  clearAuthMessages,
} from '@/features/auth/authSlice'

import {
  selectAuthLoading,
  selectAuthError,
  selectAuthSuccess,
} from '@/features/auth/authSelectors'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector)

export const useAuthLoading = () => useAppSelector(selectAuthLoading)
export const useAuthError = () => useAppSelector(selectAuthError)
export const useAuthSuccess = () => useAppSelector(selectAuthSuccess)

export const useAuthActions = () => {
  const dipatch = useAppDispatch()

  return {
    setAuthLoading: (isLoading: boolean) => dipatch(setAuthLoading(isLoading)),
    setAuthError: (error: string | null) => dipatch(setAuthError(error)),
    setAuthSuccess: (message: string | null) =>
      dipatch(setAuthSuccess(message)),
    clearAuthMessages: () => dipatch(clearAuthMessages()),
  }
}
