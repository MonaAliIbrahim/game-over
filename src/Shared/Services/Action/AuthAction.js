import { AUTH_BASE_URL } from '../api-config';
import axios from 'axios';
import { 
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
  RESET_AUTH, LOGOUT
} from './types';


/** 
 * This Function is used in Register Component
 * it Takes user data which consists of:
 * first_name, last_name, email, age, password
**/
export function signUp(user) {
  return((dispatch)=> {

    dispatch({type: SIGNUP_REQUEST});

    axios.post(`${AUTH_BASE_URL}/signup`, user)
    .then((response) => {
      if(response.data.message === 'success'){
        dispatch({type: SIGNUP_SUCCESS, payload: 'Your Account created successfuly', flag: 'success'})
      }else {
        dispatch({type: SIGNUP_SUCCESS, payload: response.data.message, flag: 'error'})
      }
    })
    .catch((error) => {
      if(error.message) {
        dispatch({type: SIGNUP_FAIL, payload: error.message, flag: 'error'})
      }else {
        dispatch({type: SIGNUP_FAIL, payload: 'something went wrong, please try again', flag: 'error'})
      }
    })
  })
}


/** 
 * This Function is used in Login Component
 * it Takes user data which consists of: email and password
 * it returns user token
**/
export function login(user) {
  return((dispatch)=> {

    dispatch({type: LOGIN_REQUEST});

    axios.post(`${AUTH_BASE_URL}/signin`, user)
    .then((response) => {
      if(response.data.message === 'success'){
        localStorage.setItem('userToken', response.data.token);
        dispatch({type: LOGIN_SUCCESS, payload: response.data.message, flag: 'success'})
      }else {
        dispatch({type: LOGIN_SUCCESS, payload: response.data.message, flag: 'error'})
      }
    })
    .catch((error) => {
      if(error.message) {
        dispatch({type: LOGIN_FAIL, payload: error.message, flag: 'error'})
      }else {
        dispatch({type: LOGIN_FAIL, payload: 'something went wrong, please try again', flag: 'error'})
      }
    })
  })
}


/** 
 * This Function is used in both Login and Register Components 
 * it used to clear prev response returned from 
 *    login and signUp Requests
 **/
export function resetResponse() {
  return((dispatch) => {
    dispatch({type: RESET_AUTH})
  })
}


/** 
 * This Function is used in Navbar Component
 * it used to clear token after logout Request
 **/
 export function logout() {
  
  localStorage.removeItem('userToken');

  return((dispatch) => {
    dispatch({type: LOGOUT})
  })
}