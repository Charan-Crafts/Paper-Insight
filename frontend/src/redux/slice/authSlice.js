import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api.js"

const initialState ={
    user:null,
    isAuthenticated:false,
    error:null,
    loading:false
}


export const checkAuthStatus = createAsyncThunk("auth/authStatus",async(_,{rejectWithValue})=>{

    try {
        
        const response = await api.get("/auth/status",{withCredentials:true});

        return response.data;
    } catch (error) {
        
        console.log(error.response.data.message);

        let message = error.response.data.message || error.message

        return rejectWithValue(message);
    }
})


export const userRegistration = createAsyncThunk("auth/register",async(registrationData,{rejectWithValue})=>{
    try {

        const response = await api.post("/auth/register",registrationData,{withCredentials:true})

        return response.data;
        
    } catch (error) {
        console.log(error.response.data.message);
        let message = error.response.data.message || error.message

        return rejectWithValue(message);
    }
})


export const userLogout = createAsyncThunk("auth/logout",async(_,{rejectWithValue})=>{

    try {
        const response = await api.post("/auth/logout",{},{withCredentials:true})

        return response.data;
    } catch (error) {
        
        console.log(error.response.data.message);
        let message = error.response.data.message || error.message

        return rejectWithValue(message);
    }
})


export const userLogin = createAsyncThunk("auth/login",async(loginData,{rejectWithValue})=>{

    try {

        const response = await api.post("/auth/login",loginData,{withCredentials:true})

        return response.data;
        
    } catch (error) {
        
        console.log(error.response.data.message);

        let message = error.response.data.message || error.message

        return rejectWithValue(message);
    }
})
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            // Auth Status
            .addCase(checkAuthStatus.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuthStatus.fulfilled,(state,action)=>{
                state.loading = false;
                state.isAuthenticated= action.payload.isAuthenticated;
                state.user = action.payload.data || null;
            })
            .addCase(checkAuthStatus.rejected,(state,action)=>{
                state.loading=false
                state.error = action.payload

            })

            // User Registration
            .addCase(userRegistration.pending,(state)=>{
                state.loading = true;
                
            })
            .addCase(userRegistration.fulfilled,(state,action)=>{
                state.loading=false,
                state.isAuthenticated=true,
                console.log("Registration successful:", action.payload);
                state.user = action.payload.data
            })
            .addCase(userRegistration.rejected,(state,action)=>{
                state.loading=false,
                state.error= action.payload
            })

            // User Logout

            .addCase(userLogout.pending,(state)=>{
                state.loading = true;
            
            })
            .addCase(userLogout.fulfilled,(state,action)=>{
                state.loading =false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(userLogout.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })

            // User login

            .addCase(userLogin.pending,(state)=>{

                state.loading = true;
            })
            .addCase(userLogin.fulfilled,(state,action)=>{
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.data;
            })
            .addCase(userLogin.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default authSlice.reducer;