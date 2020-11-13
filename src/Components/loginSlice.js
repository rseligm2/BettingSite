import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

export const loginService = createAsyncThunk('login/fetchUser', async ({username, password}) =>{
    try{
        const response = await authService.login(username, password)
        // console.log(response)
        if(response.status === 200)
            return response.json()
        else{
            const error = new Error(response.statusText);
            // console.log(error)
            return Promise.reject(error)
        }
    }catch (e){
        console.log(e.message)
    }
})

export const registerService = createAsyncThunk('login/register', async ({username, password}) =>{
    try{
        const response = await authService.register(username, password)
        // console.log(response)
        if(response.status === 200)
            return response.responseText
        else{
            let text = await response.text()
            const error = new Error(text)
            console.log(error)
            console.log(text)
            return Promise.reject(error)
        }
    }catch (e){
        console.log(e.message)
    }
})

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loggedIn: false,
    user: null,
    loginStatus: 'idle',
    registerStatus: 'idle',
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.loggedIn = true
    },
    logout: (state, action) => {
      state.user = null
      state.loggedIn = false
    },
    reset: (state,action) => {
        state.error = null
        state.loginStatus= 'idle'
        state.registerStatus = 'idle'
    }
  },
  extraReducers: {
    [loginService.pending]: (state, action) => {
      state.loginStatus = 'loading'
    },
    [loginService.fulfilled]: (state, action) => {
      state.loginStatus = 'succeeded'
      state.user = action.payload
      state.loggedIn = true
    },
    [loginService.rejected]: (state, action) => {
      state.loginStatus = 'failed'
      state.error = action.error
    },
    [registerService.pending]: (state, action) => {
        state.registerStatus = 'loading'
    },
    [registerService.fulfilled]: (state, action) => {
        state.registerStatus = 'succeeded'
    },
    [registerService.rejected]: (state, action) => {
        state.registerStatus = 'failed'
        state.error = action.error
    }
  }
})

export const { login, logout, reset } = loginSlice.actions

export const selectUser = state => state.login.user
export const checkLoggedIn = state => state.login.loggedIn
export const checkLoginStatus = state => state.login.loginStatus
export const checkRegisterStatus = state => state.login.registerStatus
export const checkError = state => state.login.error

export default loginSlice.reducer