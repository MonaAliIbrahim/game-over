import axios from 'axios';
import { GAME_BASE_URL, header } from '../api-config';
import {
  FETCH_GAMES_REQUEST, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAIL, 
  FETCH_DETAILS_REQUEST, FETCH_DETAILS_SUCCESS, FETCH_DETAILS_FAIL
} from './types.js';

const customError = 'Something went wrong, please wait a few seconds then reload the page';

/**
 * This Function is used in All Components
 * it is used to get all games
**/
export function getAllGames() {
  return((dispatch) => {
    dispatch({type: FETCH_GAMES_REQUEST});

    axios.get(`${GAME_BASE_URL}/games`, {headers: header})
    .then((response) => {
      dispatch({type: FETCH_GAMES_SUCCESS, payload: response.data})
    })
    .catch((error) => {
      if(error.message) {
        dispatch({type: FETCH_GAMES_FAIL, payload: error.message})
      }else {
        dispatch({type: FETCH_GAMES_FAIL, payload: customError})
      }
    })
  })
}


/**
 * This Function is used in Games Component
 * It takes Sort-By Name and returns all games sorted 
**/
 export function getSortedGame(sort) {
  return((dispatch) => {
    dispatch({type: FETCH_GAMES_REQUEST});

    axios.get(`${GAME_BASE_URL}/games?sort-by=${sort}`, {headers: header})
    .then((response) => {
      dispatch({type: FETCH_GAMES_SUCCESS, payload: response.data})
    })
    .catch((error) => {
      if(error.message) {
        dispatch({type: FETCH_GAMES_FAIL, payload: error.message})
      }else {
        dispatch({type: FETCH_GAMES_FAIL, payload: customError})
      }
    })
  })
}


/**
 * This Function is used in Games Component
 * It takes Platform Name and returns all games matched
**/
export function getGamesByPlatform(platform) {
  return((dispatch) => {
    dispatch({type: FETCH_GAMES_REQUEST});

    axios.get(`${GAME_BASE_URL}/games?platform=${platform}`, {headers: header})
    .then((response) => {
      dispatch({type: FETCH_GAMES_SUCCESS, payload: response.data})
    })
    .catch((error) => {
      if(error.response.data.status_message) {
        dispatch({type: FETCH_GAMES_FAIL, payload: error.response.data.status_message})
      }else {
        dispatch({type: FETCH_GAMES_FAIL, payload: customError})
      }
    })
  })
}


/**
 * This Function is used in Games Component
 * It takes Category Name and returns all games matched
**/
export function getGamesByCategory(category) {
  return((dispatch) => {
    dispatch({type: FETCH_GAMES_REQUEST});

    axios.get(`${GAME_BASE_URL}/games?category=${category}`, {headers: header})
    .then((response) => {
      dispatch({type: FETCH_GAMES_SUCCESS, payload: response.data})
    })
    .catch((error) => {
      if(error.response.data.status_message) {
        dispatch({type: FETCH_GAMES_FAIL, payload: error.response.data.status_message})
      }else {
        dispatch({type: FETCH_GAMES_FAIL, payload: customError})
      }
    })
  })
}


/**
 * This Function is used in GameDetails Component
 * It takes game id and returns all game details
**/
export function getGameDetails(id) {
  return((dispatch) => {
    dispatch({type: FETCH_DETAILS_REQUEST});

    axios.get(`${GAME_BASE_URL}/game?id=${id}`, {headers: header})
    .then((response) => {
      dispatch({type: FETCH_DETAILS_SUCCESS, payload: response.data})
    })
    .catch((error) => {
      if(error.message) {
        dispatch({type: FETCH_DETAILS_FAIL, payload: error.message})
      }else {
        dispatch({type: FETCH_DETAILS_FAIL, payload: customError})
      }
    })
  })
}