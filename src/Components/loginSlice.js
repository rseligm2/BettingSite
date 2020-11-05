import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

export const loginService = createAsyncThunk('login/fetchUser', async ({username, password}) =>{
    try{
        const response = await authService.login(username, password)
        console.log(response)
        if(response.status === 200)
            return response.json()
        else{
            const error = new Error(response.statusText);
            console.log(error)
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
    status: 'idle',
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
        state.status= 'idle'
    }
  },
  extraReducers: {
    [loginService.pending]: (state, action) => {
      state.status = 'loading'
    },
    [loginService.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.user = action.payload
      state.loggedIn = true
    },
    [loginService.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    }
  }
})

export const { login, logout, reset } = loginSlice.actions

export const selectUser = state => state.login.user
export const checkLoggedIn = state => state.login.loggedIn

export default loginSlice.reducer