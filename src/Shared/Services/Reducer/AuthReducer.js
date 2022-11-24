import * as types from '../Action/types.js';

let initState = {
  message: '',
  flag: '',
  token: ''
}

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    // SignUp
    case types.SIGNUP_REQUEST:
      return ({
        message: '',
        flag: ''
      })
    case types.SIGNUP_SUCCESS:
      return ({
        flag: action.flag,
        message: action.payload,
      })
    case types.SIGNUP_FAIL:
      return ({
        flag: action.flag,
        message: action.payload
      })

    // Login
    case types.LOGIN_REQUEST:
      return({
        message: '',
        flag: ''
      })
    case types.LOGIN_SUCCESS:
      return({
        token: action.token,
        flag: action.flag,
        message: action.payload
      })
    case types.LOGIN_FAIL:
      return({
        flag: action.flag,
        message: action.payload,
      })

    // Logout
    case types.LOGOUT:
      return({
        message: '',
        flag: '',
        token: ''
      })

    // Reset
    case types.RESET_AUTH:
      return({
        ...state,
        flag: '',
        message: '',
      })

    default:
      return state
  }
}

export default AuthReducer;