import { SET_ACTIVE_JOURNAL, SET_JOURNALS,SET_LOADING,ERROR_ALERTS,CLEAR_ERRORS } from '../types';
const Reducer = (state, action) => {
    switch (action.type) {
        case SET_JOURNALS:
            return {
                ...state,
                journals: action.payload
            }
        case SET_ACTIVE_JOURNAL:
            return {
                ...state,
                activeJournal: action.payload
            }
        case ERROR_ALERTS:
            return {
                ...state,
                error:action.payload.errors,
                loading:false
            }
        case SET_LOADING:
            return{
                ...state,
                loading:true
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}
export default Reducer;