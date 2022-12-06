import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GAME_BASE_URL, config } from '../api-config';
import axios from 'axios';

let initialState = {gameList: [], game: {}, error: ''};

export const getAllGames = createAsyncThunk('games/all', async() => {
  let response = await axios.get(`${GAME_BASE_URL}/games`, config);
  return response;
})

export const getSortedGame = createAsyncThunk('games/sort', async(sort) => {
  let response = await axios.get(`${GAME_BASE_URL}/games?sort-by=${sort}`, config);
  return response;
})

export const getGamesByPlatform = createAsyncThunk('games/platform', async(platform) => {
  let response = await axios.get(`${GAME_BASE_URL}/games?platform=${platform}`, config);
  return response;
})

export const getGamesByCategory = createAsyncThunk('games/category', async(category) => {
  let response = await axios.get(`${GAME_BASE_URL}/games?category=${category}`, config);
  return response;
})

export const getGameDetails = createAsyncThunk('games/details', async(id) => {
  let response = await axios.get(`${GAME_BASE_URL}/game?id=${id}`, config);
  return response;
})

let GamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // All
    builder.addCase(getAllGames.pending, (state) => {
      state.error = '';
      state.gameList = [];
    })
    builder.addCase(getAllGames.fulfilled, (state, {payload}) => {
      state.gameList = payload.data;
    })
    
    // Sorted
    builder.addCase(getSortedGame.pending, (state) => {
      state.error = '';
      state.gameList = [];
    })
    builder.addCase(getSortedGame.fulfilled, (state, {payload}) => {
      state.gameList = payload.data;
    })
    builder.addCase(getSortedGame.rejected, (state, action) => {
      state.error = action.error.message;
    })

    // Platform
    builder.addCase(getGamesByPlatform.pending, (state) => {
      state.error = '';
      state.gameList = [];
    })
    builder.addCase(getGamesByPlatform.fulfilled, (state, {payload}) => {
      state.gameList = payload.data;
    })
    builder.addCase(getGamesByPlatform.rejected, (state, action) => {
      state.error = action.error.message;
    })

    // Category
    builder.addCase(getGamesByCategory.pending, (state) => {
      state.error = '';
      state.gameList = [];
    })
    builder.addCase(getGamesByCategory.fulfilled, (state, {payload}) => {
      state.gameList = payload.data;
    })
    builder.addCase(getGamesByCategory.rejected, (state, action) => {
      state.error = action.error.message;
    })

    // Details
    builder.addCase(getGameDetails.pending, (state) => {
      state.error = '';
      state.game = {};
    })
    builder.addCase(getGameDetails.fulfilled, (state, {payload}) => {
      state.game = payload.data;
    })
    builder.addCase(getGameDetails.rejected, (state, action) => {
      state.error = action.error.message;
    })

  }
})

export let GamesReducer = GamesSlice.reducer;