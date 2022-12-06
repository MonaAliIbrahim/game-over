import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTH_BASE_URL } from "../api-config";
import axios from 'axios';

let initialState = {message: '', flag: '', token: ''};

export let login = createAsyncThunk('auth/login', async (user) => {
  let response = await axios.post(`${AUTH_BASE_URL}/signin`, user);
  return response;
})

export let signUp = createAsyncThunk('auth/signUp', async (user) => {
  let response = await axios.post(`${AUTH_BASE_URL}/signup`, user);
  return response;
})

let AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetResponse: (state) => {
      state.flag = '';
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.flag = '';
      state.message = '';
    })
    builder.addCase(login.fulfilled, (state, action) => {
      if(action.payload.data.message === 'success'){
        localStorage.setItem('userToken', action.payload.data.token);
        state.flag = 'success';
        state.message = action.payload.data.message;
      }else {
        state.flag = 'error';
        state.message = action.payload.data.message;
      }
    })
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.message = action.payload.errorMessage
      } else {
        state.message = action.error
      }
    })

    // Signup
    builder.addCase(signUp.fulfilled, (state, action) => {
      if(action.payload.data.message === 'success'){
        state.flag = 'success';
        state.message = 'Your Account created successfuly';
      }else {
        state.flag = 'error';
        state.message = action.payload.data.message;
      }
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.flag = 'error';
      if (action.payload) {
        state.message = action.payload.message
      } else {
        state.message = action.error
      }
    })

  }
})

export let { resetResponse } = AuthSlice.actions;

export let AuthReducer = AuthSlice.reducer;