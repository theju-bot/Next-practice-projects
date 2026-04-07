// import { useDispatch, useSelector } from 'react-redux'
// import type { RootState, AppDispatch } from './store'

// import {
//   setAuthLoading,
//   setAuthError,
//   setAuthSuccess,
//   clearAuthMessages,
// } from '@/features/auth/authSlice'

// import {
//   selectAuthLoading,
//   selectAuthError,
//   selectAuthSuccess,
// } from '@/features/auth/authSelectors'

// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector = <T>(selector: (state: RootState) => T) =>
//   useSelector(selector)

// export const useAuthLoading = () => useAppSelector(selectAuthLoading)
// export const useAuthError = () => useAppSelector(selectAuthError)
// export const useAuthSuccess = () => useAppSelector(selectAuthSuccess)

// export const useAuthActions = () => {
//   const dipatch = useAppDispatch()

//   return {
//     setAuthLoading: (isLoading: boolean) => dipatch(setAuthLoading(isLoading)),
//     setAuthError: (error: string | null) => dipatch(setAuthError(error)),
//     setAuthSuccess: (message: string | null) =>
//       dipatch(setAuthSuccess(message)),
//     clearAuthMessages: () => dipatch(clearAuthMessages()),
//   }
// }

import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useMemo } from 'react'

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

// ─── Base typed hooks ────────────────────────────────────────────────────────

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector)

// ─── Auth state readers ───────────────────────────────────────────────────────

export const useAuthLoading = () => useAppSelector(selectAuthLoading)
export const useAuthError = () => useAppSelector(selectAuthError)
export const useAuthSuccess = () => useAppSelector(selectAuthSuccess)

// ─── Auth state (all-in-one reader) ──────────────────────────────────────────
// Use this when you need more than one value to avoid multiple useSelector calls

export const useAuthState = () =>
  useAppSelector((state) => state.auth)

// ─── Auth actions ─────────────────────────────────────────────────────────────
// useMemo ensures the returned object is stable across re-renders.
// Without it, a new object is created every render, breaking React.memo
// and useEffect dependency arrays that depend on these functions.

export const useAuthActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(
    () => ({
      setAuthLoading: (isLoading: boolean) => dispatch(setAuthLoading(isLoading)),
      setAuthError: (error: string | null) => dispatch(setAuthError(error)),
      setAuthSuccess: (message: string | null) => dispatch(setAuthSuccess(message)),
      clearAuthMessages: () => dispatch(clearAuthMessages()),
    }),
    [dispatch]
  )
}