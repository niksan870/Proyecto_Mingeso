import axios from 'axios';
import {saveRol} from './getRole';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const LOGIN_PERMISSION = 'permision_user';
export const LOADING = 'loading';



const URL = 'http://35.226.163.50:8080/Backend/users';

export function signInAction( {email, password} , history) {
  return async (dispatch) => {

    dispatch({ type: LOADING,  payload: 'Buscando...'});
    
    const res = await axios.post(`${URL}/login/`,{ email, password });
    if(res.data.roles!= null){

      dispatch({ type: AUTHENTICATED });
      
      localStorage.setItem('user', res.data.token);    
      localStorage.setItem('userId', res.data.user.id);      
      console.log(res.data);
      saveRol(res.data.roles);
    } else {
      console.log(email);
      console.log(password);
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Correo o contraseña inválidos'
      
      })
   }
  }
}