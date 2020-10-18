import { createSlice } from '@reduxjs/toolkit'
import authService from './authService'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loggedIn: false,
    user: null,
    status: 'idle'
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.loggedIn = true
    },
    logout: (state, action) => {
      state.user = null
      state.loggedIn = false
    }
  }
})

export const loginService = (username, password) => {
    return async(dispatch, getState) => {
        try{
            const user = await authService.login(username, password)
            dispatch(login(user))
        }
    }
}

export const { login } = loginSlice.actions

export const selectUser = state => state.login.user
export const checkLoggedIn = state => state.login.loggedIn

export default loginSlice.reducer