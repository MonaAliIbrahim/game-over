import * as types from '../Action/types';

const initialState = {
  gameList: [],
  game: {},
  error: ''
}

const GamesReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Games
    case types.FETCH_GAMES_REQUEST:
      return({
        gameList: [],
        game: {},
        error: ''
      })
    case types.FETCH_GAMES_SUCCESS:
      return({
        ...state,
        gameList: action.payload
      })
    case types.FETCH_GAMES_FAIL:
      return({
        ...state,
        error: action.payload
      })
    
    // Fetch Game Details
    case types.FETCH_DETAILS_REQUEST:
      return({
        ...state
      })
    case types.FETCH_DETAILS_SUCCESS:
      return({
        ...state,
        game: action.payload
      })
    case types.FETCH_DETAILS_FAIL:
      return({
        ...state,
        error: action.payload
      })

    default:
      return state;
  }
}

export default GamesReducer;