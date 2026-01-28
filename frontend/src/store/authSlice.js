import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
        name: 'auth',
        initialState:{
            isAuthenticated: false,
            data: null,
            loading: "idle"
        },
        reducers: {
            setIsAuthenticated(state, action){
                state.isAuthenticated = action.payload;
            },

            setData(state, action){
                state.data = action.payload
            },

            setLoading(state, action){
                state.loading = action.payload
            }

        }
})

export const { setIsAuthenticated, setData, setLoading } = authSlice.actions

export default authSlice.reducer
