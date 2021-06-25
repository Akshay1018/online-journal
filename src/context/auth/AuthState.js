import axios from 'axios';
import React, { useReducer,useEffect } from 'react'
import AuthReducer from './AuthReducer'
import AuthContext from './AuthContext'
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED, AUTH_ERR, CLEAR_ERRORS, SET_LOADING, EMAIL_FAIL, EMAIL_SUCCESS, RESET_FAIL, RESET_SUCCESS,CLEAR_STATUS } from '../types';
import AuthToken from '../AuthToken'
function AuthState(props) {

    const initialState = {
        token: localStorage.getItem('token'),
        error: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        mailInfo: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const loadUser = async () => {
        if (localStorage.token) {
            AuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('https://journal-pro-backend.herokuapp.com/api/user/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
  

        } catch (err) {
            dispatch({
                type: AUTH_ERR,
                payload: err.response.data
            })
        }
    }
    useEffect(() => {
        if (localStorage.token) {
            loadUser();
        }
        // eslint-disable-next-line
    }, []);

    const userRegister = async (data) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            setLoading();
            const res = await axios.post(`https://journal-pro-backend.herokuapp.com/api/user/register`, data, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
       
            // loadUser()

        } catch (err) {
           
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            })
        }
    }
    const login = async (data) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            setLoading();
            const res = await axios.post(`https://journal-pro-backend.herokuapp.com/api/user/login`, data, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
      
            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data
            })
        }
    }

    const sendMail = async (email) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
  
        try {
            setLoading();
            const res = await axios.post('https://journal-pro-backend.herokuapp.com/api/user/forgetpassword', email, config);
            dispatch({
                type: EMAIL_SUCCESS,
                payload: res.data
            })
        
        } catch (err) {
         
            dispatch({
                type: EMAIL_FAIL,
                payload: err.response.data
            })

        }
    }
    const resetPassword = async (password) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
   
        
        if (localStorage.rtoken) {
            AuthToken(localStorage.rtoken);
        }
        try {
            setLoading();
            const res = await axios.put(`https://journal-pro-backend.herokuapp.com/api/user/resetpassword`, password, config);
            dispatch({
                type: RESET_SUCCESS,
                payload: res.data
            });
    
        } catch (err) {
        
            dispatch({
                type: RESET_FAIL,
                payload: err.response.data
            })
        }
    }
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }
    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }
    const clearStatus=()=>{
        dispatch({
            type:CLEAR_STATUS
        })
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                error: state.error,
                user: state.user,
                loading: state.loading,
                mailInfo: state.mailInfo,
                userRegister,
                login,
                clearErrors,
                loadUser,
                setLoading,
                sendMail,
                resetPassword,
                clearStatus
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
