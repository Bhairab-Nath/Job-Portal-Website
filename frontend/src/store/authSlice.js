import { createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../api';
import STATUSES from '../../globals/status/statuses';

const authSlice = createSlice({
        name: 'auth',
        initialState:{
            isAuthenticated: false,
            data: null,
            token: null,
            status: null,
            error: null
        },
        reducers: {
            setIsAuthenticated(state, action){
                state.isAuthenticated = action.payload;
            },

            setData(state, action){
                state.data = action.payload
            },

            setStatus(state, action){
                state.status = action.payload
            },

            setToken(state, action){
                state.token = action.payload
            },

            setError(state, action){
                state.error = action.payload
            },

            resetStatus(state){
                state.status = null
            },

            setLogout(state){
                state.isAuthenticated = false
                state.data = null
                state.token = null
                state.status = null
                state.error = null
                localStorage.removeItem('token')
            }

        }
})

export const { setIsAuthenticated, setData, setStatus, setToken, setError, resetStatus, setLogout } = authSlice.actions

export default authSlice.reducer



export function registerUser(data){
    return async function registerUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const response = await apiClient.post('/user/register',  data)

            if (response.status === 201){
                dispatch(setStatus(STATUSES.SUCCESS))
                dispatch(setData(response.data.user))
                alert('Registration Successful! Please login to continue.')
            }

        }
        catch(error){
            dispatch(setStatus(STATUSES.ERROR))
            dispatch(setError('Registration Failed'))
        }
    }
}


export function loginUser(data){
    return async function loginUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const response = await apiClient.post('/user/login', data)
            if (response.status === 200){
                dispatch(setStatus(STATUSES.SUCCESS))
                dispatch(setData(response.data.user))
                dispatch(setIsAuthenticated(true))
                dispatch(setToken(response.data.token))
                localStorage.setItem('token', response.data.token)
                alert('Login Successful!')
            }

        }
        catch(error){
            dispatch(setStatus(STATUSES.ERROR))
            dispatch(setError('Login Failed'))
        }
    }
}