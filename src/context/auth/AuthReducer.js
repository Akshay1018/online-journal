import { REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_SUCCESS, USER_LOADED, AUTH_ERR, CLEAR_ERRORS, LOGIN_FAIL, SET_LOADING, EMAIL_SUCCESS, EMAIL_FAIL, RESET_FAIL, RESET_SUCCESS,CLEAR_STATUS } from '../types'
const Reducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            }

        case REGISTER_FAIL: 
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                error: action.payload.errors,
                loading: false
            }

        case EMAIL_SUCCESS:
            localStorage.setItem('rtoken', action.payload.token);
            return {
                ...state,
                 mailInfo: action.payload.status,
                loading: false
            }

        case EMAIL_FAIL:
            localStorage.removeItem('rtoken');
            return {
                ...state,
                error: action.payload.errors,
                loading: false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false
            }
        case RESET_SUCCESS:
            localStorage.setItem('rtoken', action.payload.token);
            return {
                ...state,
                loading: false,
                mailInfo: action.payload.status
            }
        case RESET_FAIL:
            localStorage.removeItem('rtoken');
            return {
                ...state,
                loading: false,
                error: action.payload.errors
            }
        case AUTH_ERR:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload.errors
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_STATUS:
            return {
                ...state,
                mailInfo:null
            }
        default:
            return state

    }
}
export default Reducer;