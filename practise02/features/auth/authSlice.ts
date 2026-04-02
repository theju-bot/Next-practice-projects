import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AuthState } from '@/types/types'

const initialState: AuthState = {
  isLoading: false,
  error: null,
  successMessage: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.successMessage = null
    },
    setAuthSuccess: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload
      state.error = null
    },
    clearAuthMessages: (state) => {
      state.error = null
      state.successMessage = null
    },
  },
})

export const {
  setAuthLoading,
  setAuthError,
  setAuthSuccess,
  clearAuthMessages,
} = authSlice.actions

export default authSlice.reducer
