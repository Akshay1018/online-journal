
import React, { useReducer } from 'react';
import axios from 'axios';

import JournalContext from './JournalContext.js';
import JournalReducer from './JournalReducer.js';

import { SET_JOURNALS, SET_ACTIVE_JOURNAL, ERROR_ALERTS, SET_LOADING, CLEAR_ERRORS } from '../types.js';
function JournalState(props) {

    const initialState = {
        journals: [],
        activeJournal: false,
        loading: false,
        error: null

    }
    const [state, dispatch] = useReducer(JournalReducer, initialState);



    const setJournals = async () => {
        try {
            const res = await axios.get(`https://journal-pro-backend.herokuapp.com/api/user/get`);
            dispatch({
                type: SET_JOURNALS,
                payload: res.data
            });
           
        } catch (err) {
           
            return errorAlerts(err.response.data);
        }
    }

    const addJournal = async (title, journalbody) => {
       
        try {
            setLoading();
            await axios.post(`https://journal-pro-backend.herokuapp.com/api/user/add_entry`, { title, journalbody });
            setJournals();
        } catch (err) {
            return errorAlerts(err.response.data);
        }
    }

    const updateJournal = async (id, title, journalbody) => {
        try {
            setLoading();
            await axios.put(`https://journal-pro-backend.herokuapp.com/api/user/update/${id}`, { title, journalbody });
            setJournals();
        } catch (err) {
            return errorAlerts(err.response.data);
        }
    }

    const deleteJournal = async (id) => {
        try {
            setLoading();
            await axios.delete(`https://journal-pro-backend.herokuapp.com/api/user/delete/${id}`);
            setJournals();
        } catch (err) {
            return errorAlerts(err.response.data);
        }
    }

    const setActiveJournal = (id) => {
        dispatch({
            type: SET_ACTIVE_JOURNAL,
            payload: id
        });
        setJournals();
    }
    const errorAlerts = (err) => {
        dispatch({
            type: ERROR_ALERTS,
            payload: err
        })
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



    return (
        <JournalContext.Provider
            value={{
                journals: state.journals,
                activeJournal: state.activeJournal,
                error: state.error,
                loading: state.loading,
                setJournals,
                addJournal,
                deleteJournal,
                setActiveJournal,
                updateJournal,
                errorAlerts,
                clearErrors,
                setLoading
            }}>
            {props.children}
        </JournalContext.Provider>
    )
}

export default JournalState;
